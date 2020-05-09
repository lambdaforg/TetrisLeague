package tetris.rest.api.data;

import org.springframework.data.repository.CrudRepository;
import tetris.rest.api.model.entity.User;

public interface UserRepository extends CrudRepository<User, Integer> {
    User findByUsername(String username);
}
