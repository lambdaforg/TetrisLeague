package tetris.payloads.response;

import tetris.model.entity.SecurityQuestion;

import java.util.Date;
import java.util.List;

public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private int id;
    private String username;
    private String login;
    private Date created_At;
    private SecurityQuestion question1;
    private SecurityQuestion question2;
    private List<String> roles;

    public JwtResponse(String token, int id, String username, String login, Date created_At, SecurityQuestion question1, SecurityQuestion question2, List<String> roles) {
        this.token = token;
        this.id = id;
        this.username = username;
        this.login = login;
        this.created_At = created_At;
        this.question1 = question1;
        this.question2 = question2;
        this.roles = roles;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
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

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
