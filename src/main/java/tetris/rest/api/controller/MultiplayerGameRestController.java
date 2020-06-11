package tetris.rest.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tetris.rest.api.data.MultiplayerGameRestRepository;
import tetris.rest.api.data.UserRepository;
import tetris.rest.api.model.entity.MultiplayerGame;
import tetris.rest.api.model.entity.User;

import javax.persistence.criteria.CriteriaBuilder;
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
        return getAllMultiplayerGames()
                .stream()
                .filter(g -> g.getStatus().equals("pending"))
                .collect(Collectors.toList());
    }

    @GetMapping("/{gameId}")
    public MultiplayerGame getMultiplayerGame(@PathVariable("gameId") Integer gameId) {
         Optional<MultiplayerGame> game = multiplayerGameRepository.findById(gameId);
        return game.orElse(null);
    }

    @GetMapping("/getCurrentGame/{userId}")
    public MultiplayerGame getCurrentMultiplayerGame(@PathVariable("userId") Integer userId) {
        Optional<MultiplayerGame> currentGame = getAllMultiplayerGames()
                .stream()
                .filter(g -> g.getStatus().equals("started"))
                .filter(g -> g.hasPlayer(userId))
                .findFirst();
        return currentGame.orElse(null);
    }

    @PostMapping
    public MultiplayerGame newMultiplayerGame(@RequestBody MultiplayerGame newGame) {
        return multiplayerGameRepository.save(newGame);
    }

    @PutMapping("/join/{gameId}")
    public MultiplayerGame addPlayer(@PathVariable("gameId") Integer gameId, @RequestBody Integer userId) {
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

    @PutMapping("/changeStatus/{gameId}")
    public MultiplayerGame changeStatus(@PathVariable("gameId") Integer gameId, @RequestBody String status) {
        Optional<MultiplayerGame> game = multiplayerGameRepository.findById(gameId);
        if (game.isPresent()) {
            MultiplayerGame updatedGame = game.get();
            updatedGame.setStatus(status);
            return multiplayerGameRepository.save(updatedGame);
        }
        return null;
    }

    // deletes user from game
    @PutMapping("/leave/{gameId}")
    public MultiplayerGame leaveGame(@PathVariable("gameId") Integer gameId, @RequestBody Integer userId) {
        Optional<MultiplayerGame> game = multiplayerGameRepository.findById(gameId);
        if (game.isPresent()) {
            MultiplayerGame updatedGame = game.get();
            Optional<User> user = userRepository.findById(userId);
            if (user.isPresent()) {
                if (updatedGame.getPlayerOne() != null && updatedGame.getPlayerOne().getId().equals(userId)) {
                    updatedGame.setPlayerOne(null);
                } else if (updatedGame.getPlayerTwo() != null && updatedGame.getPlayerTwo().getId().equals(userId)) {
                    updatedGame.setPlayerTwo(null);
                } else if (updatedGame.getPlayerThree() != null && updatedGame.getPlayerThree().getId().equals(userId)) {
                    updatedGame.setPlayerThree(null);
                }
            }
            return multiplayerGameRepository.save(updatedGame);
        }
        return null;
    }

    @DeleteMapping("/{gameId}")
    public boolean deleteGame(@PathVariable("gameId") Integer gameId) {
        Optional<MultiplayerGame> game = multiplayerGameRepository.findById(gameId);
        if (game.isPresent()) {
            multiplayerGameRepository.delete(game.get());
            return true;
        }
        return false;
    }
}
