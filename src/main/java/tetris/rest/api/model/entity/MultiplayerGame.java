package tetris.rest.api.model.entity;

import jdk.dynalink.linker.LinkerServices;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
public class MultiplayerGame {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne
    private User host;
    @ManyToOne
    private User winner;
    private Integer numberOfPlayers;
    private Integer bet;
    private String status;

    @ManyToOne
    private User playerOne;

    @ManyToOne
    private User playerTwo;

    @ManyToOne
    private User playerThree;

    //@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getWinner() {
        return winner;
    }

    public void setWinner(User winnerId) {
        this.winner = winnerId;
    }

    public Integer getNumberOfPlayers() {
        return numberOfPlayers;
    }

    public void setNumberOfPlayers(Integer numberOfPlayers) {
        this.numberOfPlayers = numberOfPlayers;
    }

    public Integer getBet() {
        return bet;
    }

    public void setBet(Integer bet) {
        this.bet = bet;
    }

    public User getHost() {
        return host;
    }

    public void setHost(User host) {
        this.host = host;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getPlayerOne() {
        return playerOne;
    }

    public void setPlayerOne(User playerOne) {
        this.playerOne = playerOne;
    }

    public User getPlayerTwo() {
        return playerTwo;
    }

    public void setPlayerTwo(User playerTwo) {
        this.playerTwo = playerTwo;
    }

    public User getPlayerThree() {
        return playerThree;
    }

    public void setPlayerThree(User playerThree) {
        this.playerThree = playerThree;
    }
}
