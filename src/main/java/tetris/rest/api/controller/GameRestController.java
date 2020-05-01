package tetris.rest.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tetris.rest.api.data.GameRepository;
import tetris.rest.api.model.entity.Game;

import java.util.List;

@RestController
@RequestMapping("api/games")
public class GameRestController {

    @Autowired
    private GameRepository gameRepository;

    @GetMapping
    public List<Game> getAllGames(){
            return (List<Game>) gameRepository.findAll();
    }
    @GetMapping("/{id}")
    public Game getGame(@PathVariable("id") Integer id){
        return gameRepository.findById(id).get();
    }
    @PutMapping
    public Game updateGame(@RequestBody Game updatedGame){
        Game originalGame = gameRepository.findById(updatedGame.getId()).get();
        originalGame.setLevel(updatedGame.getLevel());
        originalGame.setScore(updatedGame.getScore());
        originalGame.setScoreLines(updatedGame.getScoreLines());
        return originalGame;
    }
    @PostMapping
    public Game addNewGame(@RequestBody Game newGame){
            return gameRepository.save(newGame);
    }
}

