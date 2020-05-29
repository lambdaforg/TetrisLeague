package tetris.rest.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tetris.rest.api.data.GameRepository;
import tetris.rest.api.data.MultiplayerGameRestRepository;
import tetris.rest.api.model.entity.Game;
import tetris.rest.api.model.entity.MultiplayerGame;

import javax.validation.constraints.Null;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/games")
public class GameRestController {

    @Autowired
    private GameRepository gameRepository;

    @GetMapping
    public List<Game> getAllGames() {
        return (List<Game>) gameRepository.findAll();
    }

    @GetMapping("/{id}")
    public Game getGame(@PathVariable("id") Integer id) {
        return gameRepository.findById(id).get();
    }

    @GetMapping("/getMaximumScore/{id}")
    public Integer getMaximumScore(@PathVariable("id") Integer id) {
        List<Game> result = getAllGames().stream().filter(game -> game.getUser().getId().equals(id)).collect(Collectors.toList());

        if(!result.isEmpty())
        {
            return result.stream().max((game1, game2)-> Integer.compare(game1.getScore().intValue(), game2.getScore().intValue())).get().getScore().intValue();
        }
        return 0;
    }

    //TODO pomyśleć nad zrobieniem 1 funkcji przyjmującej predykat true dla wszystkich, a warunek dla przedziału czasowego
    private List<Game> addGameToBestScores(List<Game> bestScoresById, Game game) {
        Integer currentUserId = game.getUser().getId();
        if (!bestScoresById.isEmpty()) {
            if (bestScoresById.stream().filter(game1 -> game1.getUser().getId().equals(currentUserId)).toArray().length == 0) {
                bestScoresById.add(game);
            }
        } else {
            bestScoresById.add(game);
        }
        return bestScoresById;
    }

    @GetMapping("/getGeneralBestScores")
    public List<Game> getGeneralBestScores() {
        List<Game> bestScoresById = new ArrayList<>();
        List<Game> sortedScoresByScore = getAllGames().stream().sorted(Comparator.comparing(Game::getScore)).collect(Collectors.toList());
        Collections.reverse(sortedScoresByScore);
        for (Game game : sortedScoresByScore) {
            bestScoresById = addGameToBestScores(bestScoresById, game);
        }
        return bestScoresById;
    }

    @GetMapping("/getPeriodBestScores/{date1}/{date2}")
    public List<Game> getPeriodBestScores(@PathVariable String date1, @PathVariable String date2) {
        List<Game> bestScoresById = new ArrayList<>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date d = null;
        Date d1 = null;
        Date d2 = null;
        try {
            d = sdf.parse(date1);
            d1 = sdf.parse(date2);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        List<Game> sortedScoresByScore = getAllGames().stream().sorted(Comparator.comparing(Game::getScore)).collect(Collectors.toList());
        Collections.reverse(sortedScoresByScore);
        for (Game game : sortedScoresByScore) {
            try {
                d2 = sdf.parse(game.getGameDate().toString());
            } catch (ParseException e) {
                e.printStackTrace();
            }
            if (d == null || d1 == null || d2 == null) {
                System.out.println("Dates cannot be null");
                return bestScoresById;
            }
            if (d2.compareTo(d) >= 0 && d2.compareTo(d1) <= 0) {
                bestScoresById = addGameToBestScores(bestScoresById, game);
            }
        }
        return bestScoresById;
    }


    @PutMapping
    public Game updateGame(@RequestBody Game updatedGame) {
        Game originalGame = gameRepository.findById(updatedGame.getId()).get();
        originalGame.setLevel(updatedGame.getLevel());
        originalGame.setScore(updatedGame.getScore());
        originalGame.setScoreLines(updatedGame.getScoreLines());
        gameRepository.save(originalGame);
        return originalGame;
    }

    @PostMapping
    public Game addNewGame(@RequestBody Game newGame) {
       // newGame.setId((int) gameRepository.);
        newGame.setId(null);
        return gameRepository.save(newGame);
    }

    // returns all pending multiplayer games
    @GetMapping("/getPendingMultiplayerGames")
    public List<MultiplayerGame> getPendingMultiplayerGames() {
        Set<MultiplayerGame> pendingMultiplayerGames = getAllGames()
                .stream()
                .filter(game -> game.getMultiplayerGame() != null)
                .map(Game::getMultiplayerGame)
                .filter(mG -> mG.getStatus().equals("pending"))
                .collect(Collectors.toSet());
        return List.copyOf(pendingMultiplayerGames);
    }

}


