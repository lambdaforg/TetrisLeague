package tetris.rest.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tetris.rest.api.data.MultiplayerGameRestRepository;
import tetris.rest.api.data.UserRepository;
import tetris.rest.api.model.entity.MultiplayerGame;
import tetris.rest.api.model.entity.User;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/multiplayer-games")
public class MultiplayerGameRestController {

    @Autowired
    private UserRepository userRepository;

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

    @PutMapping
    public MultiplayerGame addPlayer(@RequestBody Integer gameId, Integer userId) {
        Optional<MultiplayerGame> game = multiplayerGameRepository.findById(gameId);
        if (game.isPresent()) {
            Optional<User> user = userRepository.findById(userId);
            if (user.isPresent()) {
                MultiplayerGame updatedGame = game.get();
                updatedGame.addPlayer(user.get());
                return multiplayerGameRepository.save(updatedGame);
            }
        }
        return null;
    }

    @DeleteMapping("/{gameId}")
    public boolean deleteGame(@PathVariable("gameId") String gameId) {
        Optional<MultiplayerGame> game = multiplayerGameRepository.findById(Integer.parseInt(gameId));
        if (game.isPresent()) {
            multiplayerGameRepository.delete(game.get());
            return true;
        }
        return false;
    }
}
