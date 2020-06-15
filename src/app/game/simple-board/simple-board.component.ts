import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {BLOCK_SIZE, COLORS, COLS, ROWS} from '../classes/constants';
import {GameService} from '../classes/game.service';

@Component({
  selector: 'app-simple-board',
  templateUrl: './simple-board.component.html',
  styleUrls: ['./simple-board.component.css']
})
export class SimpleBoardComponent implements OnInit, OnChanges {

  @ViewChild('board', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  ctx: CanvasRenderingContext2D;

  @Input()
  board: number[][];

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
    this.gameService.initBoard(this.ctx, this.canvas);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.drawBoard();
  }
  //
  // private initBoard() {
  //   this.ctx = this.canvas.nativeElement.getContext('2d');
  //   // Calculate size of canvas from constants.
  //   this.ctx.canvas.width = COLS * BLOCK_SIZE;
  //   this.ctx.canvas.height = ROWS * BLOCK_SIZE;
  //   this.ctx.fillStyle = '#000000';
  //   this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  //   // Scale so we don't need to give size on every draw.
  //   this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
  //   drawGrid(1);
  // }

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

  drawBoard() {
    // Scale so we don't need to give size on every draw.
    this.board.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillStyle = COLORS[value];
          this.ctx.fillRect(x, y, 1, 1);
        }
      });
    });
    this.gameService.drawGrid(1, this.ctx, this.canvas);
  }
}
