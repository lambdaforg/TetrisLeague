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

  @Input()
  gameEnded: boolean;

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
    this.gameService.initBoard(this.ctx, this.canvas);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.gameService.initBoard(this.ctx, this.canvas);
    this.gameService.drawBoard(this.board, this.ctx);
    if (this.gameEnded) {
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(1, 3, 8, 1.2);
      this.ctx.font = '1px Arial';
      this.ctx.fillStyle = 'red';
      this.ctx.fillText('GAME OVER', 1.8, 4);
    }
  }
}
