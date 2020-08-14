package tetris.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import static org.junit.jupiter.api.Assertions.*;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import tetris.controller.RankingPointRestController;
import tetris.data.RankingPointRepository;
import tetris.model.entity.RankingPoint;
import tetris.model.entity.SecurityQuestion;
import tetris.model.entity.User;

import java.sql.Time;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc

class RankingPointControllerTest {

//    @TestConfiguration
//    static class EmployeeServiceImplTestContextConfiguration {
//
//        @Bean
//        public RankingPointController rankingPointController2() {
//            return new RankingPointController();
//        }
//    }

    @Autowired
    private MockMvc mvc;
    @Autowired
    private RankingPointRestController rankingPointRestController;
    @MockBean
    private RankingPointRepository repository;

    Date creationUser1Date;
    Time creationUser1Time;
    Date creationUser2Date;
    Time creationUser2Time;
    Date creationUser3Date;
    Time creationUser3Time;

    Date rankingPoint1Date;
    Time rankingPoint1Time;
    Date rankingPoint2Date;
    Time rankingPoint2Time;
    Date rankingPoint3Date;
    Time rankingPoint3Time;
    Date rankingPoint4Date;
    Time rankingPoint4Time;

    List<RankingPoint> rankingPoints;

    @BeforeEach
    void setUp() {
        SecurityQuestion question1 = new SecurityQuestion();
        question1.setId(0);
        question1.setQuestion("What is your favourite place?");
        SecurityQuestion question2 = new SecurityQuestion();
        question2.setId(1);
        question2.setQuestion("What is your favourite animal?");
        SecurityQuestion question3 = new SecurityQuestion();
        question3.setId(2);
        question3.setQuestion("What is your favourite actor?");
        SecurityQuestion question4 = new SecurityQuestion();
        question4.setId(3);
        question4.setQuestion("What is your favourite movie?");

        creationUser1Date = Date.valueOf("2020-05-16");
        creationUser1Time = Time.valueOf("15:45:23");
        creationUser2Date = Date.valueOf("2020-05-18");
        creationUser2Time = Time.valueOf("20:21:35");
        creationUser3Date = Date.valueOf("2020-05-14");
        creationUser3Time = Time.valueOf("16:48:15");

        rankingPoint1Date = Date.valueOf("2020-05-19");
        rankingPoint1Time = Time.valueOf("12:04:22");
        rankingPoint2Date = Date.valueOf("2020-05-19");
        rankingPoint2Time = Time.valueOf("14:10:55");
        rankingPoint3Date = Date.valueOf("2020-05-20");
        rankingPoint3Time = Time.valueOf("08:00:30");
        rankingPoint4Date = Date.valueOf("2020-05-16");
        rankingPoint4Time = Time.valueOf("17:18:44");

        User user1 = new User();
        user1.setId(0);
        user1.setUsername("VincentDin");
        user1.setLogin("VincentDin");
        user1.setPassword("hbbfoaln");
        user1.setAnswer1("Mallorca");
        user1.setAnswer2("cat");
        user1.setCreated_At(creationUser1Date);
        user1.setQuestion1(question1);
        user1.setQuestion2(question2);

        User user2 = new User();
        user2.setId(1);
        user2.setUsername("CiaraBino");
        user2.setLogin("CiaraBino");
        user2.setPassword("soufeoian");
        user2.setAnswer1("Angelina Jolie");
        user2.setAnswer2("Ice Age");
        user2.setCreated_At(creationUser2Date);
        user2.setQuestion1(question3);
        user2.setQuestion2(question4);

        User user3 = new User();
        user3.setId(2);
        user3.setUsername("MassimoCiampino");
        user3.setLogin("MassimoCiampino");
        user3.setPassword("oijwxxieiec");
        user3.setAnswer1("Brad Pitt");
        user3.setAnswer2("jaguar");
        user3.setCreated_At(creationUser3Date);
        user3.setQuestion1(question3);
        user3.setQuestion2(question2);

        RankingPoint rankingPoint1 = new RankingPoint();
        rankingPoint1.setId(0);
        rankingPoint1.setUser(user1);
        rankingPoint1.setRankingPointsDate(creationUser1Date);
        rankingPoint1.setRankingPointsTime(creationUser1Time);
        rankingPoint1.setValue(2000);

        RankingPoint rankingPoint2 = new RankingPoint();
        rankingPoint2.setId(1);
        rankingPoint2.setUser(user2);
        rankingPoint2.setRankingPointsDate(creationUser2Date);
        rankingPoint2.setRankingPointsTime(creationUser2Time);
        rankingPoint2.setValue(2000);

        RankingPoint rankingPoint3 = new RankingPoint();
        rankingPoint3.setId(2);
        rankingPoint3.setUser(user2);
        rankingPoint3.setRankingPointsDate(rankingPoint1Date);
        rankingPoint3.setRankingPointsTime(rankingPoint1Time);
        rankingPoint3.setValue(2450);

        RankingPoint rankingPoint4 = new RankingPoint();
        rankingPoint4.setId(3);
        rankingPoint4.setUser(user2);
        rankingPoint4.setRankingPointsDate(rankingPoint2Date);
        rankingPoint4.setRankingPointsTime(rankingPoint2Time);
        rankingPoint4.setValue(1848);

        RankingPoint rankingPoint5 = new RankingPoint();
        rankingPoint5.setId(4);
        rankingPoint5.setUser(user2);
        rankingPoint5.setRankingPointsDate(rankingPoint3Date);
        rankingPoint5.setRankingPointsTime(rankingPoint3Time);
        rankingPoint5.setValue(1542);

        RankingPoint rankingPoint6 = new RankingPoint();
        rankingPoint6.setId(5);
        rankingPoint6.setUser(user3);
        rankingPoint6.setRankingPointsDate(creationUser3Date);
        rankingPoint6.setRankingPointsTime(creationUser3Time);
        rankingPoint6.setValue(2000);

        RankingPoint rankingPoint7 = new RankingPoint();
        rankingPoint7.setId(6);
        rankingPoint7.setUser(user1);
        rankingPoint7.setRankingPointsDate(rankingPoint4Date);
        rankingPoint7.setRankingPointsTime(rankingPoint4Time);
        rankingPoint7.setValue(2758);


        rankingPoints = new ArrayList<>();
        rankingPoints.add(rankingPoint1);
        rankingPoints.add(rankingPoint2);
        rankingPoints.add(rankingPoint3);
        rankingPoints.add(rankingPoint4);
        rankingPoints.add(rankingPoint5);
        rankingPoints.add(rankingPoint6);
        rankingPoints.add(rankingPoint7);

        Mockito.doReturn(rankingPoints).when(repository).findAll();
//        Mockito.doReturn(rankingPoints.get(4).getValue()).when(rankingPointController).getCurrentUserRankingPoints(1);
//        Mockito.doReturn(Arrays.asList(rankingPoints.get(4), rankingPoints.get(6), rankingPoints.get(5))).when(rankingPointController).getBestRankingPoints();

    }

//    @Test
//    void getAllRankingPoints() throws Exception {
//        mvc.perform(get("/api/rankingPoints"))
//                .andExpect(status().isOk())
//                .andExpect(MockMvcResultMatchers.jsonPath("$").isArray())
//                .andExpect(MockMvcResultMatchers.jsonPath("$.[0].id",
//                        Is.is(4)))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.[0].user.id",
//                        Is.is(1)))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.[0].user.username",
//                        Is.is("CiaraBino")))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.[0].user.login",
//                        Is.is("CiaraBino")))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.[0].user.password",
//                        Is.is("soufeoian")))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.[0].user.created_At",
//                        Is.is(creationUser2Date.toString())))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.[0].user.question1.id",
//                        Is.is(0)))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.[0].user.question1.question",
//                        Is.is("What is your favourite place?")))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.[0].user.question2.id",
//                        Is.is(1)))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.[0].user.question2.question",
//                        Is.is("What is your favourite animal?")))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.[0].user.answer1",
//                        Is.is("Mallorca")))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.[0].user.answer2",
//                        Is.is("cat")))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.[0].rankingPointsDate",
//                        Is.is(creationUser1Date.toString())))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.[0].rankingPointsTime",
//                        Is.is(creationUser1Time.toString())))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.[0].value",
//                        Is.is(2000)));
//    }

    @Test
    void whenValidUserIdThenCurrentUserRankingPointsShouldBeFound() {
        Integer id = 1;
        Integer currentRankingPoints = 3165;
        Integer foundCurrentRankingPoints = rankingPointRestController.getCurrentUserRankingPoints(id);
        assertEquals(foundCurrentRankingPoints, currentRankingPoints);
    }

//whenValidName_thenEmployeeShouldBeFound()

    @Test
    void currentRankingPointsShouldBeFound() throws Exception {
        List<RankingPoint> properCurrentRankingPoints = Arrays.asList(rankingPoints.get(6), rankingPoints.get(5), rankingPoints.get(4));
        List<RankingPoint> foundCurrentRankingPoints = rankingPointRestController.getBestRankingPoints();
        assertEquals(foundCurrentRankingPoints, properCurrentRankingPoints);
    }

    //this also works
    //        mvc.perform(get("/api/rankingPoints/getBestRankingPoints"))
    //                .andExpect(status().isOk())
    //                .andExpect(MockMvcResultMatchers.jsonPath("$").isArray())
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[0].id",
    //                        Is.is(4)))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[0].user.id",
    //                        Is.is(1)))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[0].user.username",
    //                        Is.is("CiaraBino")))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[0].user.login",
    //                        Is.is("CiaraBino")))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[0].user.password",
    //                        Is.is("soufeoian")))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[0].user.created_At",
    //                        Is.is(creationUser2Date.toString())))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[0].user.question1.id",
    //                        Is.is(2)))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[0].user.question1.question",
    //                        Is.is("What is your favourite actor?")))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[0].user.question2.id",
    //                        Is.is(3)))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[0].user.question2.question",
    //                        Is.is("What is your favourite movie?")))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[0].user.answer1",
    //                        Is.is("Angelina Jolie")))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[0].user.answer2",
    //                        Is.is("Ice Age")))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[0].rankingPointsDate",
    //                        Is.is(rankingPoint3Date.toString())))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[0].rankingPointsTime",
    //                        Is.is(rankingPoint3Time.toString())))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[0].value",
    //                        Is.is(3165)))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[1].id",
    //                        Is.is(6)))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[1].user.id",
    //                        Is.is(0)))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[1].user.username",
    //                        Is.is("VincentDin")))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[1].user.login",
    //                        Is.is("VincentDin")))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[1].user.password",
    //                        Is.is("hbbfoaln")))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[1].user.created_At",
    //                        Is.is(creationUser1Date.toString())))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[1].user.question1.id",
    //                        Is.is(0)))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[1].user.question1.question",
    //                        Is.is("What is your favourite place?")))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[1].user.question2.id",
    //                        Is.is(1)))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[1].user.question2.question",
    //                        Is.is("What is your favourite animal?")))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[1].user.answer1",
    //                        Is.is("Mallorca")))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[1].user.answer2",
    //                        Is.is("cat")))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[1].rankingPointsDate",
    //                        Is.is(rankingPoint4Date.toString())))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[1].rankingPointsTime",
    //                        Is.is(rankingPoint4Time.toString())))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[1].value",
    //                        Is.is(2758)))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[2].id",
    //                        Is.is(5)))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[2].user.id",
    //                        Is.is(2)))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[2].user.username",
    //                        Is.is("MassimoCiampino")))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[2].user.login",
    //                        Is.is("MassimoCiampino")))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[2].user.password",
    //                        Is.is("oijwxxieiec")))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[2].user.created_At",
    //                        Is.is(creationUser3Date.toString())))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[2].user.question1.id",
    //                        Is.is(2)))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[2].user.question1.question",
    //                        Is.is("What is your favourite actor?")))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[2].user.question2.id",
    //                        Is.is(1)))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[2].user.question2.question",
    //                        Is.is("What is your favourite animal?")))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[2].user.answer1",
    //                        Is.is("Brad Pitt")))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[2].user.answer2",
    //                        Is.is("jaguar")))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[2].rankingPointsDate",
    //                        Is.is(creationUser3Date.toString())))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[2].rankingPointsTime",
    //                        Is.is(creationUser3Time.toString())))
    //                .andExpect(MockMvcResultMatchers.jsonPath("$.[2].value",
    //                        Is.is(2000)));
}
