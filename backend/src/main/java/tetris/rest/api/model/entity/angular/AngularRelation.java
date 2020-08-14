package tetris.rest.api.model.entity.angular;

import tetris.rest.api.model.entity.FriendRelation;

public class AngularRelation {
    private AngularUser user;
    private FriendRelation friendRelation;

    public AngularUser getUser() {
        return user;
    }

    public void setUser(AngularUser user) {
        this.user = user;
    }

    public FriendRelation getFriendRelation() {
        return friendRelation;
    }

    public void setFriendRelation(FriendRelation friendRelation) {
        this.friendRelation = friendRelation;
    }
}
