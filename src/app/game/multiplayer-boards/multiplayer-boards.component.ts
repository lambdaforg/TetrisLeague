import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {User} from '../../model/User';
import {DataService} from '../../data.service';
import {MultiplayerGame} from '../../model/MultiplayerGame';
import {Move} from '../../model/Move';
import {WebsocketService} from '../../services/websocket.service';
import {first} from 'rxjs/operators';
import {COLS, ROWS} from '../classes/constants';
import {SimpleBoardComponent} from '../simple-board/simple-board.component';
import {templateJitUrl} from '@angular/compiler';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {debugFnType} from '@stomp/stompjs';
import {async} from '@angular/core/testing';
import {BoardComponent, GameResultModalComponent} from '../board/board.component';

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
  isStarted = false;
  tempMove: Move;

  startModal: any;
  resultModal: any;

  constructor(private dataService: DataService,
              private websocketService: WebsocketService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.dataService.getCurrentMultiplayerGame(this.user.id)
      .subscribe(
        next => {
          (async () => {
              this.multiplayerGame = next;
              this.otherPlayers = this.getOtherPlayers();
              await this.openStartModal();
              // this.connect();
            }
          )();
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
      this.loadAvatar(this.multiplayerGame.host.id, index);
      index++;
    }
    if (this.multiplayerGame.playerOne.id !== this.user.id) {
      otherPlayers[index] = this.multiplayerGame.playerOne;
      this.initMove(this.multiplayerGame.playerOne.id, index);
      this.loadAvatar(this.multiplayerGame.playerOne.id, index);
      index++;
    }
    if (this.multiplayerGame.numberOfPlayers > 2) {
      if (this.multiplayerGame.playerTwo.id !== this.user.id) {
        otherPlayers.push(this.multiplayerGame.playerTwo);
        this.initMove(this.multiplayerGame.playerTwo.id, index);
        this.loadAvatar(this.multiplayerGame.playerTwo.id, index);
        index++;
      }
      if (this.multiplayerGame.numberOfPlayers > 3 && this.multiplayerGame.playerThree.id !== this.user.id) {
        otherPlayers.push(this.multiplayerGame.playerThree);
        this.initMove(this.multiplayerGame.playerThree.id, index);
        this.loadAvatar(this.multiplayerGame.playerThree.id, index);
        index++;
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

  openStartModal() {
    this.startModal = this.modalService.open(MultiplayerStartModalComponent,
      {
        size: 'sm',
        keyboard: true,
        centered: true,
        backdrop: 'static'

      });
    (async () => {
      this.websocketService.signalConnect(this.multiplayerGame.id, (msg) => {
        this.receiveSignal();
      });
      await this.delay(4000).then(res => {
        if (this.user.id === this.multiplayerGame.host.id) {
          this.websocketService.sendSignal(this.multiplayerGame.id, this.user.id);
        }
      });
    })();
    return new Promise(res => {});
  }


  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  receiveSignal() {
    if (this.isStarted) {
      // TODO: game results / block users boards
    } else {
      // TODO: start game
      this.startModal.close();
      this.connect();
      this.isStarted = true;
    }
  }
}

@Component({
  template: `
    <div class="modal-body">
      <p>{{startingGame}}</p>
    </div>
  `
})
export class MultiplayerStartModalComponent implements OnInit {

  startingGame = 'Starting game...';
  startingGame1 = 'Starting game...';
  startingGame2 = 'Starting game.';
  startingGame3 = 'Starting game..';

  constructor() {
  }

  ngOnInit() {
    setInterval(
      () => {
        this.waitingAnimation();
      }, 1000);
  }

  waitingAnimation() {
    if (this.startingGame === this.startingGame1) {
      this.startingGame = this.startingGame2;
    } else if (this.startingGame === this.startingGame2) {
      this.startingGame = this.startingGame3;
    } else if (this.startingGame === this.startingGame3) {
      this.startingGame = this.startingGame1;
    }
  }

}


// @Component({
//   template: `
//     <div class="modal-header">
//       <h4 class="modal-title">Game results</h4>
//     </div>
//     <div class="modal-body">
//       <div class="row ml-3">Score: {{ points }}</div>
//       <div class="row ml-3">Lines: {{ lines }}</div>
//       <div class="row ml-3">Level: {{ level }}</div>
//     </div>
//     <div class="modal-footer row" style="margin: 8px; padding: unset">
//       <div class="col">
//         <button (click)="activeModal.close()" class="btn btn-danger pull-left" data-orientation="cancel">Quit</button>
//       </div>
//       <div class="col">
//         <button (click)="playAgain()" class="play-button btn btn-success pull-right" ngbAutofocus>Play again</button>
//       </div>
//     </div>
//   `
// })
// export class MultiplayerResultModalComponent {
//
//   points: number;
//   lines: number;
//   level: number;
//
//   constructor(public activeModal: NgbActiveModal) {
//   }
//
//   playAgain() {
//     this.activeModal.close('play');
//   }
//
//   private initializeModal(points: number, lines: number, level: number) {
//     this.points = points;
//     this.lines = lines;
//     this.level = level;
//   }
// }
