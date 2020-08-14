package tetris.rest.api.model.entity;

import javax.persistence.*;
import java.sql.Time;
import java.util.Date;

@Entity
public class CustomerSatisfaction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @ManyToOne
    private User assesingUser;
    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private Date assesmentDate;
    private Integer assesment;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getAssesingUser() {
        return assesingUser;
    }

    public void setAssesingUser(User assesingUser) {
        this.assesingUser = assesingUser;
    }

    public Date getAssesmentDate() {
        return assesmentDate;
    }

    public void setAssesmentDate(Date assesmentDate) {
        this.assesmentDate = assesmentDate;
    }

    public Integer getAssesment() {
        return assesment;
    }

    public void setAssesment(Integer assesment) {
        this.assesment = assesment;
    }
}
