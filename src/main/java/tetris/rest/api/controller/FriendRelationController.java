package tetris.rest.api.controller;

import net.bytebuddy.description.method.ParameterList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tetris.rest.api.data.FriendRelationRepository;
import tetris.rest.api.data.UserRepository;
import tetris.rest.api.model.entity.FriendRelation;
import tetris.rest.api.model.entity.Game;
import tetris.rest.api.model.entity.angular.AngularUser;

import java.util.ArrayList;
import java.util.List;

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
        System.out.println(updatedFriendRelation.getId());
        System.out.println(updatedFriendRelation.getStatus());
        friendRelationRepository.save(originalFriendRelation);
        return originalFriendRelation;
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
}
