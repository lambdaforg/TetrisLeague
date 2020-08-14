package tetris.rest.api.data;

import org.springframework.data.repository.CrudRepository;
import tetris.rest.api.model.entity.MultiplayerGame;

public interface MultiplayerGameRestRepository extends CrudRepository<MultiplayerGame, Integer> {
}
