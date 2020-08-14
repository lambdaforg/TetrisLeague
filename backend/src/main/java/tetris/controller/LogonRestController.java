package tetris.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tetris.data.LogonRepository;
import tetris.model.entity.Logon;
import tetris.model.entity.User;

import java.sql.Time;
import java.util.*;

import static java.util.Map.Entry.comparingByValue;
import static java.util.stream.Collectors.toMap;

@RestController
@RequestMapping("api/logon")
public class LogonRestController {

    @Autowired
    private LogonRepository logonRepository;
    @Autowired
    private UserRestController userRestController;

    @GetMapping
    public List<Logon> getAllLogons() {
        List<Logon> list = new ArrayList<Logon>();
        logonRepository.findAll().forEach(list::add);
        return list;
    }

    Logon saveLogon(User user){
        Logon newLogon = new Logon();
        newLogon.setUser(user);
        System.out.println(newLogon.getUser().getId());
        newLogon.setLogonDate(new Date());
        System.out.println(newLogon.getLogonDate());
        newLogon.setLogonTime(new Time(newLogon.getLogonDate().getTime()));
        System.out.println(newLogon.getLogonTime());
        return logonRepository.save(newLogon);
    }

//    @GetMapping("/getIncidenceOfLogons/{date1}/{date2}")
//    public String[] getIncidenceOfLogons(@PathVariable("date1") String date1, @PathVariable("date2") String date2){
//        List<AngularUser> users = userRestController.getAllUsers();
//        Map<User, Integer> counter = new HashMap<>();
//        Map<User, Date> counter2 = new HashMap<>();
//        for (AngularUser user: users) {
//            counter.put(user.asUser(), 0);
//            counter2.put(user.asUser(), user.getCreated_At());
//        }
//        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
//        Date start = null;
//        Date end = null;
//        try {
//            start = sdf.parse(date1);
//            end = sdf.parse(date2);
//        } catch (ParseException e) {
//            e.printStackTrace();
//        }
//        List<String> list = new ArrayList<>();
//
//        if (start == null || end == null) {
//            return list.toArray(new String[0]);
//        }
//        List<Logon> logons = getAllLogons().stream()
//                .filter(logon -> logon.getLogonDate().after(start) && logon.getLogonDate().before(end))
//                .collect(Collectors.toList());
//
//        for (int i = 0; i < logons.size(); i++) {
//                counter.put(logons.get(i).getUser(), counter.get(logons.get(i).getUser()) + 1);
//                counter2.put(logons.get(i).getUser(), logons.get(i).getLogonDate());
//        }
//
//        long diffInMillies = Math.abs(end.getTime() - start.getTime());
//        int diff = Math.toIntExact(TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS));
//
//        if (diff > 7) {
//            diff /= 7;
//        }
//
//        for (AngularUser user: users) {
//            counter.put(user.asUser(), counter.get(user.asUser()) / diff);
//        }
//
////        if (counter.get(user).equals(7)) {
////            for (int i = 0; i < 7; i++) {
////
////            }
////            counter2.
////        } else if (counter.get(user) > 7) {
////
////        }
//        int quantity = 0;
//        counter = counter
//                .entrySet()
//                .stream()
//                .sorted(comparingByValue())
//                .collect(
//                        toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e2,
//                                LinkedHashMap::new));
//
//        Map<Integer, Integer> sameTimes = counter.stream()
//
//        String input = sdf.format(gamers.get(i).getCreated_At()) + "," + counter;
//        System.out.println(input);
//        list.add(input);
//
//        Collections.reverse(list);
//
//        return list.toArray(new String[0]);
//    }
    }
