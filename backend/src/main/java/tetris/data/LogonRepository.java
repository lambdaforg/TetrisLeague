package tetris.data;

import org.springframework.data.repository.CrudRepository;
import tetris.model.entity.Logon;

public interface LogonRepository extends CrudRepository<Logon, Integer> {
}
