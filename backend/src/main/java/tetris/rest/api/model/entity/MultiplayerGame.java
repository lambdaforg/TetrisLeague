package tetris.rest.api.model.entity;

import javax.persistence.*;

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

    private boolean duel;

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

    public boolean isDuel() {
        return duel;
    }

    public void setDuel(boolean duel) {
        this.duel = duel;
    }

    public void addPlayer(User player) {
        if (playerOne == null) {
            playerOne = player;
        } else {
            if (numberOfPlayers > 2 && playerTwo == null) {
                playerTwo = player;
            } else if (numberOfPlayers == 4 && playerThree == null) {
                playerThree = player;
            }
        }
    }

    public boolean hasPlayer(Integer userId) {
        if (host.getId().equals(userId)) {
            return true;
        } else if (playerOne.getId().equals(userId)) {
            return true;
        } else if (numberOfPlayers > 2 && playerTwo.getId().equals(userId)) {
            return true;
        } else return numberOfPlayers > 3 && playerThree.getId().equals(userId);
    }

}
