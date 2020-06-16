package tetris.rest.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tetris.rest.api.data.LogonRepository;
import tetris.rest.api.model.entity.Logon;
import tetris.rest.api.model.entity.RankingPoint;
import tetris.rest.api.model.entity.User;

import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@RequestMapping("api/logon")
public class LogonRestController {

    @Autowired
    private LogonRepository logonRepository;

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

}
