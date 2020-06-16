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
    this.gameService.initBoard(this.ctx, this.canvas);
    this.gameService.drawBoard(this.board, this.ctx);
  }
}
