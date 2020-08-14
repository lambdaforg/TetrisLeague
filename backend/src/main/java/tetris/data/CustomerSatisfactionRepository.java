package tetris.data;

import org.springframework.data.repository.CrudRepository;
import tetris.model.entity.CustomerSatisfaction;

public interface CustomerSatisfactionRepository extends CrudRepository<CustomerSatisfaction, Integer> {
}
