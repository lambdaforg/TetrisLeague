package tetris.rest.api.model.entity;

public class Move {
    private String userId;
    private String score;
    private String scoreLines;
    private String level;

    public Move(String userId, String score, String scoreLines, String level) {
        this.userId = userId;
        this.score = score;
        this.scoreLines = scoreLines;
        this.level = level;
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
}
