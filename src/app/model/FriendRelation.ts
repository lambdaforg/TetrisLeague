import {User} from "./User";

export class FriendRelation {
  id: number;
  senderUser: User;
  receiverUser: User;
  status: string;

  static fromHttp(friendRelation: FriendRelation): FriendRelation{
     const newFriendRelation = new FriendRelation();
     newFriendRelation.id = friendRelation.id;
     newFriendRelation.receiverUser = friendRelation.receiverUser;
     newFriendRelation.senderUser = friendRelation.senderUser;
     newFriendRelation.status = friendRelation.status;
     return newFriendRelation;
  }
}
