package tetris.data;

import org.springframework.data.repository.CrudRepository;
import tetris.model.entity.Avatar;

import java.util.Optional;

public interface AvatarRepository extends CrudRepository<Avatar, Integer> {
    Optional<Avatar> findByUserId(Integer userId);
}
