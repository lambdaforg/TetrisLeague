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

    @GetMapping("/getUserPeriodCurrentRankingsPoints/{id}/{date1}/{date2}")
    public String[] getUserPeriodCurrentRankingsPoints(@PathVariable("id") Integer id, @PathVariable("date1") String date1, @PathVariable("date2") String date2){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date fromDate = null;
        Date toDate = null;
        try {
            fromDate = sdf.parse(date1);
            toDate = sdf.parse(date2);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        List<RankingPoint> userRankingPoints = getAllRankingPoints().stream().filter(rankingPoint -> rankingPoint.getUser().getId().equals(id)).collect(Collectors.toList());
        List<String> list = new ArrayList<>();
        for (int i = 0; i < userRankingPoints.size(); i++) {
            Date currentRankingPointDate = null;
            try {
                currentRankingPointDate = sdf.parse(userRankingPoints.get(i).getRankingPointsDate().toString());
            } catch (ParseException e) {
                e.printStackTrace();
            }
            if (fromDate == null || toDate == null || currentRankingPointDate == null) {
                System.out.println("Dates cannot be null");
                return list.toArray(new String[0]);
            }
            if(currentRankingPointDate.compareTo(fromDate) >= 0 && currentRankingPointDate.compareTo(toDate) <= 0){
                list.add(sdf.format(userRankingPoints.get(i).getRankingPointsDate()) + "," + userRankingPoints.get(i).getValue() );
                System.out.println("list length -1: " + (list.size() - i - 1));
            }
        }
        Collections.reverse(list);

        return list.toArray(new String[0]);

    }

}
