package tetris.rest.api.model.entity;

import javax.persistence.*;
import java.sql.Time;
import java.util.Date;

@Entity
public class RankingPoint {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @ManyToOne
    private User user;
    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private Date rankingPointsDate;
    private Time rankingPointsTime;
    private Integer value;

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

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    public Date getRankingPointsDate() {
        return rankingPointsDate;
    }

    public void setRankingPointsDate(Date rankingPointsDate) {
        this.rankingPointsDate = rankingPointsDate;
    }

    public Time getRankingPointsTime() {
        return rankingPointsTime;
    }

    public void setRankingPointsTime(Time rankingPointsTime) {
        this.rankingPointsTime = rankingPointsTime;
    }
}
