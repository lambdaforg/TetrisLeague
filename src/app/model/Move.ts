export class Move {
  userId: number;
  score: number;
  scoreLines: number;
  level: number;
  board: number[][];

  constructor(userId?: number, score?: number, scoreLines?: number, level?: number, board?: number[][]) {
    this.userId = userId;
    this.score = score;
    this.scoreLines = scoreLines;
    this.level = level;
    this.board = board;
  }
}
