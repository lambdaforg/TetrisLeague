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

    //@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ElementCollection
    private Set<Integer> usersIds;

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

    public Set<Integer> getUsersIds() {
        return usersIds;
    }

    public void setUsersIds(Set<Integer> usersIds) {
        this.usersIds = usersIds;
    }

    public void addUserId(Integer id) {
        this.usersIds.add(id);
    }
}
