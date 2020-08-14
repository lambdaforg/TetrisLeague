package tetris.rest.api.model.entity;

import javax.persistence.*;
import java.sql.Time;
import java.util.Date;

@Entity
public class Logon {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @ManyToOne
    private User user;
    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private Date logonDate;
    private Time logonTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getLogonDate() {
        return logonDate;
    }

    public void setLogonDate(Date logonDate) {
        this.logonDate = logonDate;
    }

    public Time getLogonTime() {
        return logonTime;
    }

    public void setLogonTime(Time logonTime) {
        this.logonTime = logonTime;
    }
}
