package tetris.rest.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tetris.rest.api.data.FriendRelationRepository;
import tetris.rest.api.model.entity.FriendRelation;
import tetris.rest.api.model.entity.Game;

import java.util.List;

@RestController
@RequestMapping("api/friends")
public class FriendRelationController {
    @Autowired
    private FriendRelationRepository friendRelationRepository;

    @GetMapping
    public List<FriendRelation> getAllGames(){
        return (List<FriendRelation>) friendRelationRepository.findAll();
    }
    @GetMapping("/{id}")
    public FriendRelation getFriendRelation(@PathVariable("id") Integer id){
        return friendRelationRepository.findById(id).get();
    }
    @PutMapping
    public FriendRelation updateGame(@RequestBody FriendRelation updatedFriendRelation){
        FriendRelation originalFriendRelation = friendRelationRepository.findById(updatedFriendRelation.getId()).get();
        originalFriendRelation.setStatus(updatedFriendRelation.getStatus());
        return originalFriendRelation;
    }
    @PostMapping
    public FriendRelation addNewGame(@RequestBody FriendRelation newFriendRelation){
        return friendRelationRepository.save(newFriendRelation);
    }
}
