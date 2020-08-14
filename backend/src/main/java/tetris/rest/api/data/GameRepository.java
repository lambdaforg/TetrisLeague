package tetris.rest.api.data;

import org.springframework.data.repository.CrudRepository;
import tetris.rest.api.model.entity.Game;

public interface GameRepository extends CrudRepository<Game,Integer> {
}
