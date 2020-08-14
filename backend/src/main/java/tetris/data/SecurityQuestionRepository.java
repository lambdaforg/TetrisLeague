package tetris.data;

import org.springframework.data.repository.CrudRepository;
import tetris.model.entity.SecurityQuestion;

import java.util.Optional;

public interface SecurityQuestionRepository extends CrudRepository<SecurityQuestion, Integer> {
    Optional<SecurityQuestion> findByQuestion(String question);
}

