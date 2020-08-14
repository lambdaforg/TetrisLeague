package tetris.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import tetris.data.SecurityQuestionRepository;
import tetris.model.entity.ERole;
import tetris.model.entity.Role;
import tetris.model.entity.User;
import tetris.payloads.request.LoginRequest;
import tetris.payloads.request.SignupRequest;
import tetris.data.RoleRepository;
import tetris.data.UserRepository;
import tetris.model.entity.angular.AngularQuestion;
import tetris.model.entity.angular.AngularUser;
import tetris.payloads.response.JwtResponse;
import tetris.payloads.response.MessageResponse;
import tetris.security.jwt.JwtUtils;
import tetris.security.services.UserDetailsImpl;

import javax.validation.Valid;

@RestController
@RequestMapping("api/users")
public class UserRestController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RankingPointRestController rankingPointRestController;
    @Autowired
    private LogonRestController logonRestController;

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private SecurityQuestionRepository securityQuestionRepository;

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

        User user = userRepository.findByLogin(userDetails.getLogin()).get();
        logonRestController.saveLogon(user);

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
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {
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

        user.setQuestion1(securityQuestionRepository.findByQuestion(signUpRequest.getQuestion1()).get());
        user.setQuestion2(securityQuestionRepository.findByQuestion(signUpRequest.getQuestion2()).get());
        user.setAnswer1(signUpRequest.getAnswer1());
        user.setAnswer2(signUpRequest.getAnswer2());
        user.setCreated_At(new Date());
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
        System.out.println(rankingPointRestController.giveRegistrationBonus(user).getId());

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
    @PostMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestBody SignupRequest signUpRequest) {
        if (!userRepository.existsByLogin(signUpRequest.getLogin())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Login is not exist!"));
        }
        User user = userRepository.findByLogin(signUpRequest.getLogin()).get();
        if(!user.getQuestion1().getQuestion().equals(signUpRequest.getQuestion1()) || !user.getQuestion2().getQuestion().equals(signUpRequest.getQuestion2())){
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Taken bad questions!"));
        }
        if(!user.getAnswer1().equals(signUpRequest.getAnswer1()) || !user.getAnswer2().equals(signUpRequest.getAnswer2())){
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Bad answers for questions!"));
        }
        user.setPassword(encoder.encode(signUpRequest.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("Password changed successfully!"));
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
    @GetMapping("/getQuestions")
    public List<AngularQuestion> getQuestions(){
        List<AngularQuestion> list = new ArrayList<AngularQuestion>();
        securityQuestionRepository.findAll().forEach(question -> list.add(new AngularQuestion(question)));
        return list;
    }
    @PostMapping
    public AngularUser newUser(@RequestBody AngularUser user){
            return new AngularUser(userRepository.save(user.asUser()));
    }

    @GetMapping("/getPeriodGamers/{date1}/{date2}")
    public String[] getPeriodGamers(@PathVariable("date1") String date1, @PathVariable("date2") String date2){
        int counter = 0;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date fromDate = null;
        Date toDate = null;
        try {
            fromDate = sdf.parse(date1);
            toDate = sdf.parse(date2);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        List<AngularUser> gamers = getAllUsers();
        List<String> list = new ArrayList<>();
        for (int i = 0; i < gamers.size(); i++) {
            counter++;
            Date currentGamerDate = null;
            try {
                currentGamerDate = sdf.parse(gamers.get(i).getCreated_At().toString());
            } catch (ParseException e) {
                e.printStackTrace();
            }
            if (fromDate == null || toDate == null || currentGamerDate == null) {
                System.out.println("Dates cannot be null");
                return list.toArray(new String[0]);
            }
            if(currentGamerDate.compareTo(fromDate) >= 0 && currentGamerDate.compareTo(toDate) <= 0){
                String input = sdf.format(gamers.get(i).getCreated_At()) + "," + counter;
                System.out.println(input);
                list.add(input);
//                System.out.println("gamers list length -1: " + (list.size() - i - 1));
            }
        }
        Collections.reverse(list);

        return list.toArray(new String[0]);
    }
}
