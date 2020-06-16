import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BLOCK_SIZE, COLORS, COLS, KEY, LEVEL, LINES_PER_LEVEL, POINTS, ROWS} from '../classes/constants';
import {IPiece, Piece} from '../classes/piece';
import {GameService} from '../classes/game.service';
import {DataService} from '../../data.service';
import {formatDate, formatNumber} from '@angular/common';
import {User} from '../../model/User';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LeaveRoomDialogComponent} from '../../menu/waiting-room/room-modal/room-modal.component';
import {Game} from '../../model/Game';
import {error} from 'selenium-webdriver';
import {MultiplayerGame} from '../../model/MultiplayerGame';
import {Move} from '../../model/Move';

// import {privateDecrypt} from 'crypto';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @ViewChild('board', {static: true})
  canvas: ElementRef<HTMLCanvasElement>;
  // @ViewChild('current', {static: true})
  // canvasCurrent: ElementRef<HTMLCanvasElement>;
  @ViewChild('next', {static: true})
  canvasNext: ElementRef<HTMLCanvasElement>;

  @Input()
  user: User;

  @Input()
  isMultiplayer: boolean;

  @Input()
  multiplayerGame: MultiplayerGame;

  game: Game;

  ctx: CanvasRenderingContext2D;
  // ctxCurrent: CanvasRenderingContext2D;
  ctxNext: CanvasRenderingContext2D;

  board: number[][];
  piece: Piece;
  next: Piece;
  requestId: number;
  time: { start: number; elapsed: number; level: number };
  points: number;
  lines: number;
  level: number;

  moves = {
    [KEY.LEFT]: (p: IPiece): IPiece => ({...p, x: p.x - 1}),
    [KEY.RIGHT]: (p: IPiece): IPiece => ({...p, x: p.x + 1}),
    [KEY.DOWN]: (p: IPiece): IPiece => ({...p, y: p.y + 1}),
    [KEY.SPACE]: (p: IPiece): IPiece => ({...p, y: p.y + 1}),
    [KEY.UP]: (p: IPiece): IPiece => this.service.rotate(p)
  };

  move: Move;
  @Output()
  moveEvent = new EventEmitter<Move>();

  // To do another class Key Handler
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY.ESC) {
      this.gameOver();
    } else if (this.moves[event.keyCode]) {
      event.preventDefault();
      // Get new state
      let p = this.moves[event.keyCode](this.piece);
      if (event.keyCode === KEY.SPACE) {
        // Hard drop
        while (this.service.valid(p, this.board)) {
          this.points += POINTS.HARD_DROP;
          this.piece.move(p);
          p = this.moves[KEY.DOWN](this.piece);
        }
      } else if (this.service.valid(p, this.board)) {
        this.piece.move(p);
        if (event.keyCode === KEY.DOWN) {
          this.points += POINTS.SOFT_DROP;
        }
      }
    }
  }

  constructor(private service: GameService,
              private dataService: DataService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.service.initBoard(this.ctx, this.canvas);
    // this.initCurrent();
    this.initNext();
    this.resetGame();
    if (this.isMultiplayer) {
      this.initMultiplayer();
    }
  }

  // initBoard() {
  //   this.ctx = this.canvas.nativeElement.getContext('2d');
  //   // Calculate size of canvas from constants.
  //   this.ctx.canvas.width = COLS * BLOCK_SIZE;
  //   this.ctx.canvas.height = ROWS * BLOCK_SIZE;
  //   this.ctx.fillStyle = '#000000';
  //   this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  //   // Scale so we don't need to give size on every draw.
  //   this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
  //   this.drawGrid(1);
  // }

  // initCurrent() {
  //   this.ctxCurrent = this.canvasCurrent.nativeElement.getContext('2d');
  //
  //   // Calculate size of canvas from constants.
  //   this.ctxCurrent.canvas.width = 4 * BLOCK_SIZE;
  //   this.ctxCurrent.canvas.height = 4 * BLOCK_SIZE;
  //
  //   this.ctxCurrent.scale(BLOCK_SIZE, BLOCK_SIZE);
  // }

  initNext() {
    this.ctxNext = this.canvasNext.nativeElement.getContext('2d');

    // Calculate size of canvas from constants.
    this.ctxNext.canvas.width = 4 * BLOCK_SIZE;
    this.ctxNext.canvas.height = 4 * BLOCK_SIZE;

    this.ctxNext.scale(BLOCK_SIZE, BLOCK_SIZE);
  }

  play() {
    this.resetGame();

    this.next = new Piece(this.ctx);
    this.piece = new Piece(this.ctx);
    // this.piece.drawNext(this.ctxCurrent);
    this.next.drawNext(this.ctxNext);
    this.time.start = performance.now();
    // If we have an old game running a game then cancel the old
    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
    }
    this.animate();
    this.game = new Game();
    this.game.id = 19;
    this.game.user = this.user;
    this.game.multiplayerGame = this.multiplayerGame;
    this.game.gameDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-UK');
    this.game.score = 0;
    this.game.scoreLines = 0;
    this.game.level = 0;
    this.game.gameTime = formatDate(new Date(), 'HH:mm:ss', 'en-UK');
    this.dataService.createGame(this.game).subscribe(
      next => {
        this.game.id = next.id;
        console.log(next);
      },
      error => {
        console.log(error);
      }
    );
  }

  // drawGrid(s: number) {
  //   this.ctx.strokeStyle = '#373d42';
  //   this.ctx.lineWidth = 0.10;
  //   this.ctx.beginPath();
  //   for (let x = 0; x <= this.ctx.canvas.width; x += s) {
  //     this.ctx.moveTo(x, 0);
  //     this.ctx.lineTo(x, this.ctx.canvas.height);
  //   }
  //   for (let y = 0; y <= this.ctx.canvas.height; y += s) {
  //     this.ctx.moveTo(0, y);
  //     this.ctx.lineTo(this.ctx.canvas.width, y);
  //   }
  //   this.ctx.stroke();
  // }

  resetGame() {
    this.points = 0;
    this.lines = 0;
    this.level = 0;
    this.board = this.getEmptyBoard();
    this.time = {start: 0, elapsed: 0, level: LEVEL[this.level]};
  }

  animate(now = 0) {


    this.time.elapsed = now - this.time.start;
    if (this.time.elapsed > this.time.level) {
      this.time.start = now;
      if (!this.drop()) {
        this.gameOver();
        return;
      }
    }
    this.draw();

    this.requestId = requestAnimationFrame(this.animate.bind(this));
  }

  draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.stroke();
    this.piece.draw();
    this.service.drawBoard(this.board, this.ctx);
  }

  drop(): boolean {
    let p = this.moves[KEY.DOWN](this.piece);
    if (this.service.valid(p, this.board)) {
      this.piece.move(p);
    } else {
      this.freeze();
      this.clearLines();
      if (this.piece.y === 0) {
        // Game over
        return false;
      }
      this.piece = this.next;
      this.next = new Piece(this.ctx);
      // this.piece.drawNext(this.ctxCurrent);
      if (this.isMultiplayer) {
        this.emitMoveEvent();
      }
      this.next.drawNext(this.ctxNext);
    }
    return true;
  }

  clearLines() {
    let lines = 0;
    this.board.forEach((row, y) => {
      if (row.every(value => value !== 0)) {
        lines++;
        this.board.splice(y, 1);
        this.board.unshift(Array(COLS).fill(0));
      }
    });
    if (lines > 0) {
      this.points += this.service.getLinesClearedPoints(lines, this.level);
      this.lines += lines;
      if (this.lines >= LINES_PER_LEVEL) {
        this.level++;
        this.lines -= LINES_PER_LEVEL;
        this.time.level = LEVEL[this.level];
      }
    }
  }

  freeze() {
    this.piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.board[y + this.piece.y][x + this.piece.x] = value;
        }
      });
    });
  }

  // drawBoard() {
  //   // Scale so we don't need to give size on every draw.
  //   this.board.forEach((row, y) => {
  //     row.forEach((value, x) => {
  //       if (value > 0) {
  //         this.ctx.fillStyle = COLORS[value];
  //         this.ctx.fillRect(x, y, 1, 1);
  //       }
  //     });
  //   });
  //   this.service.drawGrid(1, this.ctx, this.canvas);
  // }

  // TODO: if multiplayer send event when game ended
  gameOver() {
    cancelAnimationFrame(this.requestId);
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(1, 3, 8, 1.2);
    this.ctx.font = '1px Arial';
    this.ctx.fillStyle = 'red';
    this.ctx.fillText('GAME OVER', 1.8, 4);

    // this.user.points.push(this.points);
    this.dataService.event.emit(this.user);

    if (!this.isMultiplayer) {
      this.showGameResults();
    }

    this.game.score = this.points;
    this.game.scoreLines = this.lines;
    this.game.level = this.level;

    this.dataService.updateGame(this.game).subscribe(
      next => {
        console.log(next);
        // this.game = next;
      },
      error => {
      }
    );

  }

  getEmptyBoard(): number[][] {
    return Array.from({length: ROWS}, () => Array(COLS).fill(0));
  }

  private initMultiplayer() {
    this.move = new Move();
    this.move.userId = this.user.id;
    this.move.score = 0;
    this.move.level = 0;
    this.move.scoreLines = 0;
    this.move.board = this.board;
  }

  private emitMoveEvent() {
    this.move.score = this.points;
    this.move.scoreLines = this.lines;
    this.move.level = this.level;
    this.move.board = this.board;
    this.moveEvent.emit(this.move);
  }

  private showGameResults() {
    const modalRef = this.modalService.open(GameResultModalComponent,
      {
        size: 'sm',
        keyboard: true,
        centered: true

      });

    modalRef.componentInstance.initializeModal(this.points, this.lines, this.level);

    modalRef.result.then((result) => {
      if (result === 'play') {
        this.play();
      }
    });
  }


}

@Component({
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Game results</h4>
    </div>
    <div class="modal-body">
      <div class="row ml-3">Score: {{ points }}</div>
      <div class="row ml-3">Lines: {{ lines }}</div>
      <div class="row ml-3">Level: {{ level }}</div>
    </div>
    <div class="modal-footer row" style="margin: 8px; padding: unset">
      <div class="col">
        <button (click)="activeModal.close()" class="btn btn-danger pull-left" data-orientation="cancel">Quit</button>
      </div>
      <div class="col">
        <button (click)="playAgain()" class="play-button btn btn-success pull-right" ngbAutofocus>Play again</button>
      </div>
    </div>
  `
})
export class GameResultModalComponent {

  points: number;
  lines: number;
  level: number;

  constructor(public activeModal: NgbActiveModal) {
  }

  playAgain() {
    this.activeModal.close('play');
  }

  private initializeModal(points: number, lines: number, level: number) {
    this.points = points;
    this.lines = lines;
    this.level = level;
  }
}
