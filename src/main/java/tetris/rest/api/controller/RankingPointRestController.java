package tetris.rest.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tetris.rest.api.data.RankingPointRepository;
import tetris.rest.api.model.entity.Game;
import tetris.rest.api.model.entity.RankingPoint;
import tetris.rest.api.model.entity.User;

import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/rankingPoints")
public class RankingPointRestController {

    @Autowired
    private RankingPointRepository rankingPointRepository;

    @GetMapping
    public List<RankingPoint> getAllRankingPoints() {
        return (List<RankingPoint>) rankingPointRepository.findAll();
    }

    @GetMapping("/{id}")
    public Integer getCurrentUserRankingPoints(@PathVariable Integer id){
        List<RankingPoint> sortedRankingPoints = getAllRankingPoints().stream().filter(rankingPoint -> rankingPoint.getUser().getId().equals(id)).sorted(Comparator.comparing(RankingPoint::getRankingPointsDate).reversed()).collect(Collectors.toList());
        Date latestRankingsPointsDate = sortedRankingPoints.get(0).getRankingPointsDate();
        return sortedRankingPoints.stream().filter(rankingPoint -> rankingPoint.getRankingPointsDate().equals(latestRankingsPointsDate)).sorted(Comparator.comparing(RankingPoint::getRankingPointsTime).reversed()).map(RankingPoint::getValue).findFirst().get();
    }

    @GetMapping("/getBestRankingPoints")
    public List<RankingPoint> getBestRankingPoints(){
        List<RankingPoint> bestRankingPointsById = new ArrayList<>();
        List<RankingPoint> sortedRankingPointsByScore = getAllRankingPoints().stream().sorted(Comparator.comparing(RankingPoint::getRankingPointsDate).thenComparing(RankingPoint::getRankingPointsTime).reversed()).collect(Collectors.toList());
        for (RankingPoint rankingPoint : sortedRankingPointsByScore) {
            Integer currentUserId = rankingPoint.getUser().getId();
            if (!bestRankingPointsById.isEmpty()) {
                if (bestRankingPointsById.stream().filter(rankingPoint1 -> rankingPoint1.getUser().getId().equals(currentUserId)).toArray().length == 0) {
                    bestRankingPointsById.add(rankingPoint);
                }
            } else {
                bestRankingPointsById.add(rankingPoint);
            }
        }
        return bestRankingPointsById.stream().sorted(Comparator.comparing(RankingPoint::getValue).reversed()).collect(Collectors.toList());

    }

    RankingPoint giveRegistrationBonus(User user){
        RankingPoint newRankingPoint = new RankingPoint();
        newRankingPoint.setUser(user);
        System.out.println(newRankingPoint.getUser());
        newRankingPoint.setRankingPointsDate(user.getCreated_At());
        System.out.println(newRankingPoint.getRankingPointsDate());
        newRankingPoint.setRankingPointsTime(new Time(user.getCreated_At().getTime()));
        System.out.println(newRankingPoint.getRankingPointsTime());
        newRankingPoint.setValue(2000);
        System.out.println(newRankingPoint.getValue());
        return rankingPointRepository.save(newRankingPoint);
    }
}
