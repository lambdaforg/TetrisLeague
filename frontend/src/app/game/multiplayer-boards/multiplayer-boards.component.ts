import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {User} from '../../model/User';
import {DataService} from '../../data.service';
import {MultiplayerGame} from '../../model/MultiplayerGame';
import {Move} from '../../model/Move';
import {WebsocketService} from '../../services/websocket.service';
import {first, max} from 'rxjs/operators';
import {COLS, ROWS} from '../classes/constants';
import {SimpleBoardComponent} from '../simple-board/simple-board.component';
import {templateJitUrl} from '@angular/compiler';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {debugFnType} from '@stomp/stompjs';
import {async} from '@angular/core/testing';
import {BoardComponent, GameResultModalComponent} from '../board/board.component';
import {isFromDtsFile} from '@angular/compiler-cli/src/ngtsc/util/src/typescript';
import {Router} from '@angular/router';

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
  endedGames = new Array<boolean>();
  isStarted = false;
  tempMove: Move;
  yourLastMove: Move;
  endedGamesCount = 0;

  startModal: any;

  constructor(private dataService: DataService,
              private websocketService: WebsocketService,
              private modalService: NgbModal,
              private router: Router) {
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
    // tslint:disable-next-line:triple-equals
    if (this.tempMove.userId != this.user.id) {
      // tslint:disable-next-line:triple-equals
      const index = this.otherPlayers.findIndex(p => p.id == this.tempMove.userId);
      this.moves[index] = this.tempMove;
    } else {
      this.yourLastMove = this.tempMove;
    }
  }

  initMove(userId: number, index: number) {
    this.moves[index] = (new Move(userId, 0, 0, 0,
      Array.from({length: ROWS}, () => Array(COLS).fill(0))));
    this.endedGames[index] = false;
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
        this.receiveSignal(msg.body);
      });
      await this.delay(4000).then(res => {
        if (this.user.id === this.multiplayerGame.host.id) {
          this.websocketService.sendSignal(this.multiplayerGame.id, this.user.id);
        }
      });
    })();
    return new Promise(res => {
    });
  }


  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  receiveSignal(msg) {
    if (this.isStarted) {
      // tslint:disable-next-line:triple-equals
      if (msg != this.user.id) {
        console.log(msg);
        // tslint:disable-next-line:triple-equals
        const index = this.otherPlayers.findIndex(p => p.id == msg);
        this.endedGames[index] = true;
      }
      this.endedGamesCount++;
      if (this.endedGamesCount === this.multiplayerGame.numberOfPlayers) {
        this.showGameResults();
      }
    } else {
      this.startModal.close();
      this.connect();
      this.isStarted = true;
    }
  }

  gameOver() {
    this.websocketService.sendSignal(this.multiplayerGame.id, this.user.id);
  }

  showGameResults() {
    const modalRef = this.modalService.open(MultiplayerResultModalComponent, {
      size: 'sm',
      keyboard: true,
      centered: true,
      backdrop: 'static'

    });
    const maxScore = Math.max.apply(Math, this.moves.map(m => m.score));
    let winnerScore = this.moves.find(m => m.score = maxScore);
    let winnerUser: User;
    if (this.yourLastMove.score > winnerScore.score) {
      winnerScore = this.yourLastMove;
      modalRef.componentInstance.youWonInit(winnerScore.score, winnerScore.scoreLines, winnerScore.level);
      winnerUser = this.user;
    } else {
      // tslint:disable-next-line:triple-equals
      winnerUser = this.otherPlayers.find(u => u.id == winnerScore.userId);
      modalRef.componentInstance.otherPlayerWonInit(
        winnerUser.username,
        winnerScore.score,
        this.yourLastMove.score,
        this.yourLastMove.scoreLines,
        this.yourLastMove.level
      );
    }
    this.dataService.setMultiplayerGameWinner(this.multiplayerGame.id, winnerUser.id).subscribe(
      next => console.log(next)
    );
    modalRef.result.then(
      (result) => {
        this.router.navigate(['menu'], {queryParams: {action: 'waitingRoom'}});
      }
    );
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


@Component({
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Game results</h4>
    </div>
    <div class="modal-body" *ngIf="otherPlayerWon">
      <div class="row ml-2">
        <h5>{{winner}} won with score: {{winnerScore}}</h5>
      </div>
      <div class="row ml-3">Your result:</div>
      <div class="row ml-3">Score: {{ score }}</div>
      <div class="row ml-3">Lines: {{ lines }}</div>
      <div class="row ml-3">Level: {{ level }}</div>
    </div>
    <div class="modal-body" *ngIf="!otherPlayerWon">
      <div class="row ml-2">
        <h5>You won!</h5>
      </div>
      <div class="row ml-3">Score: {{ score }}</div>
      <div class="row ml-3">Lines: {{ lines }}</div>
      <div class="row ml-3">Level: {{ level }}</div>
    </div>
    <div class="modal-footer row" style="margin: 8px; padding: unset">
      <div class="col">
        <button (click)="activeModal.close()" class="btn btn-danger pull-left" data-orientation="cancel">Quit</button>
      </div>
    </div>
  `
})
export class MultiplayerResultModalComponent {

  otherPlayerWon: boolean;
  winner: string;
  winnerScore: number;
  score: number;
  lines: number;
  level: number;

  constructor(public activeModal: NgbActiveModal) {
  }

  otherPlayerWonInit(winner: string, winnerScore: number, score: number, lines: number, level: number) {
    this.winner = winner;
    this.winnerScore = winnerScore;
    this.score = score;
    this.lines = lines;
    this.level = level;
    this.otherPlayerWon = true;
  }

  youWonInit(score: number, lines: number, level: number) {
    this.score = score;
    this.lines = lines;
    this.level = level;
    this.otherPlayerWon = false;
  }
}
