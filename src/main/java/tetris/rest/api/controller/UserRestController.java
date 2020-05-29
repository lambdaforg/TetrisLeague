package tetris.rest.api.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import tetris.rest.api.data.FriendRelationRepository;
import tetris.rest.api.data.RoleRepository;
import tetris.rest.api.data.UserRepository;
import tetris.rest.api.model.entity.ERole;
import tetris.rest.api.model.entity.FriendRelation;
import tetris.rest.api.model.entity.Role;
import tetris.rest.api.model.entity.User;
import tetris.rest.api.model.entity.angular.AngularUser;
import tetris.rest.api.payloads.request.LoginRequest;
import tetris.rest.api.payloads.request.SignupRequest;
import tetris.rest.api.payloads.response.JwtResponse;
import tetris.rest.api.payloads.response.MessageResponse;
import tetris.rest.api.security.jwt.JwtUtils;
import tetris.rest.api.security.services.UserDetailsImpl;

import javax.validation.Valid;

import static java.util.stream.Collectors.summarizingInt;
import static java.util.stream.Collectors.toList;

@RestController
@RequestMapping("api/users")
public class UserRestController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private FriendRelationRepository friendRelationRepository;

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping
    public List<AngularUser> getAllUsers() {
        List<AngularUser> list = new ArrayList<AngularUser>();
        userRepository.findAll().forEach(user -> list.add(new AngularUser(user)));
        return list;
    }


   /* @PostMapping("/getauth")
    public AngularUser getUserByAuthorized(@RequestBody User user){
        User resultUser = userRepository.findByLogin(user.getLogin());
        if(resultUser != null) {
            if (resultUser.getPassword().equals(user.getPassword()))
                return new AngularUser(resultUser);
        }
            return null;
    }*/

    /** Sign in **/
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getLogin(), loginRequest.getPassword()));

        System.out.println(loginRequest.getPassword() +  "   "+loginRequest.getLogin());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getLogin(),
                userDetails.getCreated_At(),
                userDetails.getQuestion1(),
                userDetails.getQuestion2(),
                roles));
    }


    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByLogin(signUpRequest.getLogin())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Login is already taken!"));
        }
        System.out.println(signUpRequest.getPassword() +  "   "+signUpRequest.getLogin());
        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getLogin(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRole();
       Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    case "mod":
                        Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }


    @GetMapping("/{id}")
    public AngularUser getUser(@PathVariable("id") Integer id){
            return new AngularUser(userRepository.findById(id).get());
    }

    @PutMapping
    public AngularUser updateUser(@RequestBody AngularUser updatedUser) {
        User originalUser = userRepository.findById(updatedUser.getId()).get();
        originalUser.setUsername(updatedUser.getUsername());
        return new AngularUser(userRepository.save(originalUser));
    }
    @PostMapping
    public AngularUser newUser(@RequestBody AngularUser user){
            return new AngularUser(userRepository.save(user.asUser()));
    }

}
