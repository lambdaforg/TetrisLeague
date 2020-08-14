package tetris.rest.api.data;

import org.springframework.data.repository.CrudRepository;
import tetris.rest.api.model.entity.SecurityQuestion;
import tetris.rest.api.model.entity.User;

import java.util.Optional;

public interface SecurityQuestionRepository extends CrudRepository<SecurityQuestion, Integer> {
    Optional<SecurityQuestion> findByQuestion(String question);
}

