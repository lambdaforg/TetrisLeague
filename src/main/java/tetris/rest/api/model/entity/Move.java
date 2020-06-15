package tetris.rest.api.model.entity;

import org.apache.tomcat.util.json.JSONParser;

import java.util.Arrays;

public class Move {
    private String userId;
    private String score;
    private String scoreLines;
    private String level;
    private int[][] board;

    public Move(String userId, String score, String scoreLines, String level, int[][] board) {
        this.userId = userId;
        this.score = score;
        this.scoreLines = scoreLines;
        this.level = level;
        this.board = board;
    }

    public String getUserId() {
        return userId;
    }

    public String getScore() {
        return score;
    }

    public String getScoreLines() {
        return scoreLines;
    }

    public String getLevel() {
        return level;
    }

    public int[][] getBoard() {
        return board;
    }
}
