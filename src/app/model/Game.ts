import {User} from "./User";
import {MultiplayerGame} from "./MultiplayerGame";

export class Game {
  id: number;
  user: User;
  multiplayerGame: MultiplayerGame;
  gameDate: string;
  score: number;
  scoreLines: number;
  level: number;
  gameTime: string;

}
