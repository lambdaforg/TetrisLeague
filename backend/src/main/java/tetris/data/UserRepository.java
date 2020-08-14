package tetris.data;

import org.springframework.data.repository.CrudRepository;
import tetris.model.entity.User;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Integer> {
    Optional<User> findByUsername(String username);
    Optional<User> findByLogin(String login);

    Boolean existsByLogin(String login);

}
