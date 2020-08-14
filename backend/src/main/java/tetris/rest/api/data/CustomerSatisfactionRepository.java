package tetris.rest.api.data;

import org.springframework.data.repository.CrudRepository;
import tetris.rest.api.model.entity.CustomerSatisfaction;

public interface CustomerSatisfactionRepository extends CrudRepository<CustomerSatisfaction, Integer> {
}
