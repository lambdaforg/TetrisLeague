package tetris.rest.api.model.entity;

import javax.persistence.*;
import java.sql.Time;
import java.util.Date;

@Entity
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @ManyToOne
    private User user;
    @ManyToOne
    private MultiplayerGame multiplayerGame;
    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private Date gameDate;
    private Integer score;
    private Integer scoreLines;
    private Integer level;
    private Time gameTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Time getGameTime() {
        return gameTime;
    }

    public void setGameTime(Time gameTime) {
        this.gameTime = gameTime;
    }

    public Date getGameDate() {
        return gameDate;
    }

    public void setGameDate(Date gameDate) {
        this.gameDate = gameDate;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getScoreLines() {
        return scoreLines;
    }

    public void setScoreLines(Integer scoreLines) {
        this.scoreLines = scoreLines;
    }

    public MultiplayerGame getMultiplayerGame() {
        return multiplayerGame;
    }

    public void setMultiplayerGame(MultiplayerGame multiplayerGameId) {
        this.multiplayerGame = multiplayerGameId;
    }
}
