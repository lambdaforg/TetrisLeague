package tetris.rest.api.controller;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tetris.rest.api.data.UserRepository;
import tetris.rest.api.model.entity.User;
import tetris.rest.api.model.entity.angular.AngularUser;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api/users")
public class UserRestController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<AngularUser> getAllUsers() {
        List<AngularUser> list = new ArrayList<AngularUser>();
        userRepository.findAll().forEach(user -> list.add(new AngularUser(user)));
        return list;
    }

    @GetMapping("/{id}")
    public AngularUser getUser(@PathVariable("id") Integer id){
            return new AngularUser(userRepository.findById(id).get());
    }

    @PutMapping
    public AngularUser updateUser(@RequestBody AngularUser updatedUser) {
        User originalUser = userRepository.findById(updatedUser.getId()).get();
        originalUser.setUsername(updatedUser.getUsername());
        originalUser.setRankingsPoints(updatedUser.getRankingsPoints());
        return new AngularUser(userRepository.save(originalUser));
    }
    @PostMapping
    public AngularUser newUser(@RequestBody AngularUser user){
            return new AngularUser(userRepository.save(user.asUser()));
    }

}
