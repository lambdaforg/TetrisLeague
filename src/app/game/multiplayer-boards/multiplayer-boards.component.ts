import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {User} from '../../model/User';
import {DataService} from '../../data.service';
import {MultiplayerGame} from '../../model/MultiplayerGame';
import {Move} from '../../model/Move';
import {WebsocketService} from '../../services/websocket.service';
import {first} from 'rxjs/operators';
import {COLS, ROWS} from '../classes/constants';
import {SimpleBoardComponent} from '../simple-board/simple-board.component';
import {templateJitUrl} from '@angular/compiler';

@Component({
  selector: 'app-multiplayer-boards',
  templateUrl: './multiplayer-boards.component.html',
  styleUrls: ['./multiplayer-boards.component.css'],
})
export class MultiplayerBoardsComponent implements OnInit, OnDestroy {

  @Input()
  multiplayerGameId: number;

  @Input()
  user: User;

  multiplayerGame: MultiplayerGame;
  otherPlayers: Array<User>;
  moves = new Array<Move>();
  avatars = new Array<any>();
  isInitialized = false;
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
    let index = 0;
    if (this.multiplayerGame.host.id !== this.user.id) {
      otherPlayers[index] = this.multiplayerGame.host;
      this.initMove(this.multiplayerGame.host.id, index);
      this.loadAvatar(this.multiplayerGame.host.id , index);
      index ++;
    }
    if (this.multiplayerGame.playerOne.id !== this.user.id) {
      otherPlayers[index] = this.multiplayerGame.playerOne;
      this.initMove(this.multiplayerGame.playerOne.id, index);
      this.loadAvatar(this.multiplayerGame.playerOne.id, index);
      index ++;
    }
    if (this.multiplayerGame.numberOfPlayers > 2) {
      if (this.multiplayerGame.playerTwo.id !== this.user.id) {
        otherPlayers.push(this.multiplayerGame.playerTwo);
        this.initMove(this.multiplayerGame.playerTwo.id, index);
        this.loadAvatar(this.multiplayerGame.playerTwo.id , index);
        index ++;
      }
      if (this.multiplayerGame.numberOfPlayers > 3 && this.multiplayerGame.playerThree.id !== this.user.id) {
        otherPlayers.push(this.multiplayerGame.playerThree);
        this.initMove(this.multiplayerGame.playerThree.id, index);
        this.loadAvatar(this.multiplayerGame.playerThree.id, index);
        index ++;
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
    console.log(move);
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

  initMove(userId: number, index: number) {
    this.moves[index] = (new Move(userId, 0, 0, 0,
      Array.from({length: ROWS}, () => Array(COLS).fill(0))));
  }

  loadAvatar(userId: number, index: number) {
      this.dataService.getAvatar(userId)
        .subscribe(
          data => {
            this.avatars[index] = data;
          }
        );
    }

}
