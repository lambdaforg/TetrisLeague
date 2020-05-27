import {User} from './User';

export class MultiplayerGame {
  id: number;
  host: User;
  winner: User;
  numberOfPlayers: number;
  bet: number;
  usersIds: Array<number>;
  status: string;
  duel: boolean;
}
