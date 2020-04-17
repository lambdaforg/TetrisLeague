// Taki mockup na chwile kiedy jeszcze nie mamy backendu.
export class User {
  id: number;
  login: string;
  password: string;
  name: string;

  points: Array<number> = new Array<number>();

  Questions: Array<Questions>
  answerQuestion1: string;
  answerQuestion2: string;

}
export enum Questions {
  question1 = 'Question 1',
  question2 = 'Question 2',
  question3 = 'Question 3'
}
