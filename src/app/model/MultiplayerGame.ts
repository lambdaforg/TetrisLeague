import {User} from './User';

export class MultiplayerGame {
  id: number;
  host: User;
  winner: User;
  playerOne: User;
  playerTwo: User;
  playerThree: User;
  numberOfPlayers: number;
  bet: number;
  status: string;
  duel: boolean;

  constructor(host: User, numberOfPlayers: number, bet: number) {
    this.host = host;
    this.numberOfPlayers = numberOfPlayers;
    this.bet = bet;
    this.status = 'pending';
  }


}
