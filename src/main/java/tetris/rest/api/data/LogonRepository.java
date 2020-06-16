package tetris.rest.api.data;

import org.springframework.data.repository.CrudRepository;
import tetris.rest.api.model.entity.Logon;

public interface LogonRepository extends CrudRepository<Logon, Integer> {
}
