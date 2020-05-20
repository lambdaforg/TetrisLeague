package tetris.rest.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tetris.rest.api.data.AvatarRepository;
import tetris.rest.api.model.entity.Avatar;

import javax.persistence.criteria.CriteriaBuilder;
import javax.swing.filechooser.FileNameExtensionFilter;
import java.io.ByteArrayOutputStream;
import java.io.FilenameFilter;
import java.io.IOException;
import java.util.Objects;
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;


@RestController
@RequestMapping("api/avatars")
public class AvatarRestController {

    @Autowired
    private AvatarRepository avatarRepository;

    // compressing the image bytes before storing it in the database
    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (HttpMessageNotWritableException e) {
            e.getMessage();
        }
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);
        return outputStream.toByteArray();
    }

    // uncompressing the image bytes before returning it to the angular application
    public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException ioe) {
            ioe.printStackTrace();
        } catch (DataFormatException e) {
            System.out.println(e.getMessage());
        }
        return outputStream.toByteArray();
    }

    private static Integer getUserId(String filename) {
        return Integer.parseInt(filename.replaceFirst("[.][^.]+$", ""));
    }

    @PostMapping
    public Avatar uploadAvatar(@RequestParam("avatar") MultipartFile file) throws IOException {
        System.out.println("Original Image Byte Size - " + file.getBytes().length);
        Avatar newAvatar = new Avatar(file.getOriginalFilename(), file.getContentType(),
                compressBytes(file.getBytes()));
        newAvatar.setUserId(getUserId(Objects.requireNonNull(file.getOriginalFilename())));
        avatarRepository.findByUserId(newAvatar.getUserId()).ifPresent(existingAvatar -> avatarRepository.delete(existingAvatar));
        avatarRepository.save(newAvatar);
        return newAvatar;
    }

    @GetMapping(path = {"/{userId}"})
    public Avatar getAvatar(@PathVariable("userId") Integer userId) throws IOException {
        Optional<Avatar> retrievedImage = avatarRepository.findByUserId(userId);
        return retrievedImage.map(avatar -> new Avatar(avatar.getName(), avatar.getType(),
                decompressBytes(avatar.getPicByte()))).orElse(null);
    }
}
