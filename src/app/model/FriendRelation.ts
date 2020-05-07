import {User} from "./User";

export class FriendRelation {
  id: number;
  senderUser: User;
  receiverUser: User;
  status: string;
}
