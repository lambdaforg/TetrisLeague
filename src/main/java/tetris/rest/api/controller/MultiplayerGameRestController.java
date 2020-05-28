package tetris.rest.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tetris.rest.api.data.MultiplayerGameRestRepository;
import tetris.rest.api.model.entity.Game;
import tetris.rest.api.model.entity.MultiplayerGame;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/multiplayer-games")
public class MultiplayerGameRestController {

    @Autowired
    private MultiplayerGameRestRepository multiplayerGameRepository;

    @GetMapping
    public List<MultiplayerGame> getAllMultiplayerGames() {
        return (List<MultiplayerGame>) multiplayerGameRepository.findAll();
    }

    // returns all pending multiplayer games
    @GetMapping("/getPendingMultiplayerGames")
    public List<MultiplayerGame> getPendingMultiplayerGames() {

//        multiplayerGames.forEach(
//                g -> {
//                    if (g.getUsersIds().size() == 0) {
//                        g.addUserId(g.getHost().getId());
//                    }
//                });
        return getAllMultiplayerGames()
                .stream()
                .filter(g -> g.getStatus().equals("pending"))
                .collect(Collectors.toList());
    }

    @PostMapping
    public MultiplayerGame newMultiplayerGame(@RequestBody MultiplayerGame newGame) {
        return multiplayerGameRepository.save(newGame);
    }
}
