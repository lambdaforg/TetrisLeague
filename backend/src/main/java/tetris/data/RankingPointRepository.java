package tetris.data;

import org.springframework.data.repository.CrudRepository;
import tetris.model.entity.RankingPoint;

public interface RankingPointRepository extends CrudRepository<RankingPoint, Integer> {
}
