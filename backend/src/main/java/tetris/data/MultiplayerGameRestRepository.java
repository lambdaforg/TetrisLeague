package tetris.data;

import org.springframework.data.repository.CrudRepository;
import tetris.model.entity.MultiplayerGame;

public interface MultiplayerGameRestRepository extends CrudRepository<MultiplayerGame, Integer> {
}
