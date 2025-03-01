import { Injectable } from '@angular/core';
import {BLOCK_SIZE, COLORS, COLS, POINTS, ROWS} from './constants';
import {IPiece} from './piece';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  valid(p: IPiece, board: number[][]): boolean {
    return p.shape.every((row, dy) => {
      return row.every((value, dx) => {
        let x = p.x + dx;
        let y = p.y + dy;
        return (
          this.isEmpty(value) ||
          (this.insideWalls(x) &&
            this.aboveFloor(y) &&
            this.notOccupied(board, x, y))
        );
      });
    });
  }

  isEmpty(value: number): boolean {
    return value === 0;
  }

  insideWalls(x: number): boolean {
    return x >= 0 && x < COLS;
  }

  aboveFloor(y: number): boolean {
    return y <= ROWS;
  }

  notOccupied(board: number[][], x: number, y: number): boolean {
    return board[y] && board[y][x] === 0;
  }

  rotate(piece: IPiece): IPiece {
    let p: IPiece = JSON.parse(JSON.stringify(piece));
    for (let y = 0; y < p.shape.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [p.shape[x][y], p.shape[y][x]] = [p.shape[y][x], p.shape[x][y]];
      }
    }
    p.shape.forEach(row => row.reverse());
    return p;
  }

  getLinesClearedPoints(lines: number, level: number): number {
    const lineClearPoints =
      lines === 1
        ? POINTS.SINGLE
        : lines === 2
        ? POINTS.DOUBLE
        : lines === 3
          ? POINTS.TRIPLE
          : lines === 4
            ? POINTS.TETRIS
            : 0;

    return (level + 1) * lineClearPoints;
  }

  initBoard(ctx, canvas) {
    ctx = canvas.nativeElement.getContext('2d');
    // Calculate size of canvas from constants.
    ctx.canvas.width = COLS * BLOCK_SIZE;
    ctx.canvas.height = ROWS * BLOCK_SIZE;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // Scale so we don't need to give size on every draw.
    ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
    this.drawGrid(1, ctx);
  }

  drawGrid(s: number, ctx) {
    ctx.strokeStyle = '#373d42';
    ctx.lineWidth = 0.10;
    ctx.beginPath();
    for (let x = 0; x <= ctx.canvas.width; x += s) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, ctx.canvas.height);
    }
    for (let y = 0; y <= ctx.canvas.height; y += s) {
      ctx.moveTo(0, y);
      ctx.lineTo(ctx.canvas.width, y);
    }
    ctx.stroke();
  }

  drawBoard(board: number[][], ctx) {
    // Scale so we don't need to give size on every draw.
    board.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          ctx.fillStyle = COLORS[value];
          ctx.fillRect(x, y, 1, 1);
        }
      });
    });
    this.drawGrid(1, ctx);
  }
}
