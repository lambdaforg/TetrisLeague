package tetris.data;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import tetris.model.entity.FriendRelation;
import tetris.model.entity.User;

public interface FriendRelationRepository extends CrudRepository<FriendRelation, Integer> {
    List<FriendRelation> findAllBySenderUser(User senderUser);
    List<FriendRelation> findAllByReceiverUser(User receiverUser);
}
