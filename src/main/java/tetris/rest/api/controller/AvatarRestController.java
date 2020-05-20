package tetris.rest.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tetris.rest.api.data.AvatarRepository;
import tetris.rest.api.model.entity.Avatar;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@RestController
@RequestMapping("/api/avatars")
public class AvatarRestController {

    @Autowired
    private AvatarRepository avatarRepository;

    @PostMapping("/upload")
    public ResponseEntity.BodyBuilder uploadAvatar(@RequestParam("imageFile") MultipartFile file) throws IOException {
        System.out.println("Original Image Byte Size - " + file.getBytes().length);
        Avatar avatar = new Avatar(file.getOriginalFilename(), file.getContentType(),
                compressBytes(file.getBytes()));
        avatarRepository.save(avatar);
        return ResponseEntity.status(HttpStatus.OK);
    }

    @GetMapping(path = { "/get/{imageName}" })
    public Avatar getAvatar(@PathVariable("imageName") String imageName) throws IOException {
        final Optional<Avatar> retrievedImage = avatarRepository.findByName(imageName);
        return new Avatar(retrievedImage.get().getName(), retrievedImage.get().getType(),
                decompressBytes(retrievedImage.get().getPicByte()));
    }
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
}
