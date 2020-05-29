package tetris.rest.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tetris.rest.api.data.FriendRelationRepository;
import tetris.rest.api.data.UserRepository;
import tetris.rest.api.model.entity.FriendRelation;
import tetris.rest.api.model.entity.User;
import tetris.rest.api.model.entity.angular.AngularRelation;
import tetris.rest.api.model.entity.angular.AngularUser;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@RestController
@RequestMapping("api/friends")
public class FriendRelationController {
    @Autowired
    private FriendRelationRepository friendRelationRepository;
    @Autowired
   private UserRepository userRepository;
    @GetMapping
    public List<FriendRelation> getAllFriendRelations(){
        return (List<FriendRelation>) friendRelationRepository.findAll();
    }
    @GetMapping("/{id}")
    public FriendRelation getFriendRelation(@PathVariable("id") Integer id){
        return friendRelationRepository.findById(id).get();
    }
    @GetMapping("/{id}/{idFrom}")
    public FriendRelation getFriendRelation(@PathVariable("id") Integer id, @PathVariable("idFrom") Integer idFrom){
      List<FriendRelation> friendRelations = new ArrayList<>();
      friendRelationRepository.findAllByReceiverUser(userRepository.findById(id).get()).forEach(friendRelations::add);
      FriendRelation friendRelation = friendRelations.stream().filter(p -> p.getSenderUser().getId().equals(idFrom)).collect(toList()).get(0);
      return friendRelation;
    }
    @PutMapping
    public FriendRelation updateFriendRelation(@RequestBody FriendRelation updatedFriendRelation){
        FriendRelation originalFriendRelation = friendRelationRepository.findById(updatedFriendRelation.getId()).get();
        originalFriendRelation.setStatus(updatedFriendRelation.getStatus());
        friendRelationRepository.save(originalFriendRelation);
        return originalFriendRelation;
    }
    @PostMapping("/byusername")
    public FriendRelation addNewFriendRelationByUsername(@RequestBody AngularRelation angularRelation){
            AngularUser senderUser = angularRelation.getUser();
            FriendRelation newFriendRelation = angularRelation.getFriendRelation();
            Optional<User> receiverUser = userRepository.findByUsername(senderUser.getUsername());
            if(receiverUser != null) {
                if(getInvitations(receiverUser.get().getId(), "Invited").isEmpty()){
                newFriendRelation.setReceiverUser(receiverUser.get());
                newFriendRelation.setSenderUser(userRepository.findByUsername(newFriendRelation.getSenderUser().getUsername()).get());
                friendRelationRepository.save(newFriendRelation);
                /*TO DO response*/
                }
            }
            return newFriendRelation;
    }
    @PostMapping
    public FriendRelation addNewFriendRelation(@RequestBody FriendRelation newFriendRelation){
        return friendRelationRepository.save(newFriendRelation);
    }
    @GetMapping("/getinvitations/{id}/{status}")
    public List<AngularUser> getInvitations(@PathVariable("id") Integer id, @PathVariable("status") String status){
      List<FriendRelation> listRelations = new ArrayList<>();
      friendRelationRepository.findAllByReceiverUser(userRepository.findById(id).get()).forEach(listRelations::add);
      List<AngularUser> users = listRelations.stream().filter(p -> p.getStatus().equals(status)).map(p -> {
          return new AngularUser(userRepository.findById(p.getSenderUser().getId()).get());
        }
      ).collect(toList());

      return users;
    }

    @GetMapping("/getfriends/{id}")
    public List<AngularUser> getAllFriends(@PathVariable("id") Integer id) {
        List<FriendRelation> listRelations = new ArrayList<>();
        friendRelationRepository.findAllBySenderUser(userRepository.findById(id).get()).forEach(listRelations::add);
        friendRelationRepository.findAllByReceiverUser(userRepository.findById(id).get()).forEach(listRelations::add);
        List<AngularUser> users = listRelations.stream().filter(p -> p.getStatus().equals("Accepted")).map( p -> {
                    Integer idReceiver = p.getReceiverUser().getId();
                    if(!idReceiver.equals(id))
                        return  new AngularUser(userRepository.findById(p.getReceiverUser().getId()).get());
                    return new AngularUser(userRepository.findById(p.getSenderUser().getId()).get());
                }
        ).collect(toList());

        return users;
    }
}
