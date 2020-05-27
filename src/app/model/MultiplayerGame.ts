import {User} from './User';

export class MultiplayerGame {
  id: number;
  host: User;
  winner: User;
  numberOfPlayers: number;
  bet: number;
  players: Array<User>;
  status: string;
  duel: boolean;
}
