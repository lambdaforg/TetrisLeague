package tetris.rest.api.model.entity.angular;

import tetris.rest.api.model.entity.SecurityQuestion;
import tetris.rest.api.model.entity.User;
import java.util.Date;

public class AngularUser {
    private int id;
    private String username;
    private String login;
    private Date created_At;
    private SecurityQuestion question1;
    private SecurityQuestion question2;
    private String answer1;
    private String answer2;

    public AngularUser(){

    }


    public AngularUser(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.login = user.getLogin();
        this.created_At = user.getCreated_At();
        this.question1 = user.getQuestion1();
        this.question2 = user.getQuestion2();
        this.answer1 = user.getAnswer1();
        this.answer2 = user.getAnswer2();
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Date getCreated_At() {
        return created_At;
    }

    public void setCreated_At(Date created_At) {
        this.created_At = created_At;
    }

    public SecurityQuestion getQuestion1() {
        return question1;
    }

    public void setQuestion1(SecurityQuestion question1) {
        this.question1 = question1;
    }

    public SecurityQuestion getQuestion2() {
        return question2;
    }

    public void setQuestion2(SecurityQuestion question2) {
        this.question2 = question2;
    }

    public String getAnswer1() {
        return answer1;
    }

    public void setAnswer1(String answer1) {
        this.answer1 = answer1;
    }

    public String getAnswer2() {
        return answer2;
    }

    public void setAnswer2(String answer2) {
        this.answer2 = answer2;
    }
    public User asUser() {
        User user = new User();
        user.setId(id);
        user.setUsername(username);
        user.setAnswer1(answer1);
        user.setAnswer2(answer2);
        user.setCreated_At(created_At);
        user.setQuestion1(question1);
        user.setQuestion2(question2);
        return user;
    }
}
