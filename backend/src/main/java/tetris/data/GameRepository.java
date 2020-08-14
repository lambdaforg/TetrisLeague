package tetris.data;

import org.springframework.data.repository.CrudRepository;
import tetris.model.entity.Game;

public interface GameRepository extends CrudRepository<Game,Integer> {
}
