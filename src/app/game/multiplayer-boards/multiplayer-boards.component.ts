import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../model/User';
import {DataService} from '../../data.service';
import {MultiplayerGame} from '../../model/MultiplayerGame';
import {Move} from '../../model/Move';
import {WebsocketService} from '../../services/websocket.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-multiplayer-boards',
  templateUrl: './multiplayer-boards.component.html',
  styleUrls: ['./multiplayer-boards.component.css']
})
export class MultiplayerBoardsComponent implements OnInit, OnDestroy {

  @Input()
  multiplayerGameId: number;

  @Input()
  user: User;

  multiplayerGame: MultiplayerGame;
  otherPlayers: Array<User>;
  isInitialized = false;
  moves = new Array<Move>();
  tempMove: Move;

  constructor(private dataService: DataService,
              private websocketService: WebsocketService) {
  }

  ngOnInit(): void {
    this.dataService.getCurrentMultiplayerGame(this.user.id)
      .subscribe(
        next => {
          this.multiplayerGame = next;
          this.otherPlayers = this.getOtherPlayers();
          this.isInitialized = true;
          this.connect();
        },
        error => {
          console.log(error.message);
        });
  }

  ngOnDestroy() {
    // TODO: change game status
  }

  getOtherPlayers(): Array<User> {
    const otherPlayers = new Array<User>();
    if (this.multiplayerGame.host.id !== this.user.id) {
      otherPlayers.push(this.multiplayerGame.host);
      this.moves.push(new Move(this.multiplayerGame.host.id, 0, 0, 0));
    }
    if (this.multiplayerGame.playerOne.id !== this.user.id) {
      otherPlayers.push(this.multiplayerGame.playerOne);
      this.moves.push(new Move(this.multiplayerGame.playerOne.id, 0, 0, 0));
    }
    if (this.multiplayerGame.numberOfPlayers > 2) {
      if (this.multiplayerGame.playerTwo.id !== this.user.id) {
        otherPlayers.push(this.multiplayerGame.playerTwo);
        this.moves.push(new Move(this.multiplayerGame.playerTwo.id, 0, 0, 0));
      }
      if (this.multiplayerGame.numberOfPlayers > 3 && this.multiplayerGame.playerThree.id !== this.user.id) {
        otherPlayers.push(this.multiplayerGame.playerThree);
        this.moves.push(new Move(this.multiplayerGame.playerThree.id, 0, 0, 0));
      }
    }
    console.log(otherPlayers);
    return otherPlayers;
  }

  connect(): void {
    this.websocketService.connect(this.multiplayerGame.id, (msg) => {
      this.assignMove(msg.body);
    });
  }

  sendMove(move: Move) {
    this.websocketService.send(this.multiplayerGame.id, move);
  }

  assignMove(message) {
    this.tempMove = new Move();
    Object.assign(this.tempMove, JSON.parse(message));
    console.log(this.tempMove);
    // tslint:disable-next-line:triple-equals
    if (this.tempMove.userId != this.user.id) {
      // tslint:disable-next-line:triple-equals
      const index = this.otherPlayers.findIndex(p => p.id == this.tempMove.userId);
      console.log(index);
      this.moves[index] = this.tempMove;
    } else {
      console.log('the same user');
    }
  }

}
