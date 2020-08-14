package tetris.rest.api.data;

import org.springframework.data.repository.CrudRepository;
import tetris.rest.api.model.entity.RankingPoint;

public interface RankingPointRepository extends CrudRepository<RankingPoint, Integer> {
}
