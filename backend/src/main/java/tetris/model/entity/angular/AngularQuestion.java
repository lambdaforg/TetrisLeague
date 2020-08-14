package tetris.model.entity.angular;

import tetris.model.entity.SecurityQuestion;

public class AngularQuestion {
    private int id;
    private String question;

    public AngularQuestion(SecurityQuestion securityQuestion) {
        this.id = securityQuestion.getId();
        this.question = securityQuestion.getQuestion();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }
}
