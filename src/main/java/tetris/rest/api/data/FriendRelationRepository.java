package tetris.rest.api.data;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import tetris.rest.api.model.entity.FriendRelation;
import tetris.rest.api.model.entity.User;

import javax.persistence.criteria.CriteriaBuilder;

public interface FriendRelationRepository extends CrudRepository<FriendRelation, Integer> {
    List<FriendRelation> findAllBySenderUser(User senderUser);
    List<FriendRelation> findAllByReceiverUser(User receiverUser);
}
