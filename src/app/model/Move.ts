export class Move {
  userId: number;
  score: number;
  scoreLines: number;
  level: number;

  constructor(userId?: number, score?: number, scoreLines?: number, level?: number) {
    this.userId = userId;
    this.score = score;
    this.scoreLines = scoreLines;
    this.level = level;
  }
}
