// Taki mockup na chwile kiedy jeszcze nie mamy backendu.
import {Role} from "./Role";

export class User {
  id: number;
  username: string;
  login: string;
  password: string;

  // points: Array<number> = [];
  created_At: Date;
  question1: SecurityQuestion;
  question2: SecurityQuestion;
  // Questions: Array<Questions> = [];
  answer1: string;
  answer2: string;
  active: boolean;
  role: Role;

  static fromHttp(user: User): User {
    const newUser = new User();
    newUser.id = user.id;
    newUser.username = user.username;
    newUser.created_At = user.created_At;
    newUser.question1 = SecurityQuestion.fromHttp(user.question1);
    newUser.question2 = SecurityQuestion.fromHttp(user.question2);
    newUser.active = user.active;
    newUser.role = Role.fromHttp(user.role);
    newUser.answer1 = user.answer1;
    newUser.answer2 = user.answer2;
    return newUser;
  }
  static friendFromHttp(user: User) : User{
    const newUser = new User();
    newUser.id = user.id;
    newUser.username = user.username;
    newUser.rankingsPoints = user.rankingsPoints;
    newUser.created_At = user.created_At;
    return newUser;
  }

  static friendFromHttp(user: User) : User{
    const newUser = new User();
    newUser.id = user.id;
    newUser.username = user.username;
    newUser.created_At = user.created_At;
    return newUser;
  }

}
export enum Questions {
  question1 = 'What is your favourite place?',
  question2 = 'What is your favourite animal?',
  question3 = 'What is your favourite actor?',
  qusetion4 = 'What is your favourite movie?'
}

export class SecurityQuestion {
  id: number;
  question: Questions;

  static fromHttp(securityQuestion: SecurityQuestion){
    const newsecurityQuestion = new SecurityQuestion();
    newsecurityQuestion.id = securityQuestion.id;
    let correctQuestion;
    for (let member in Questions) {
      if (Questions[member] === securityQuestion.question) {
        correctQuestion = member;
      }
    }
    console.log(correctQuestion);
    newsecurityQuestion.question = correctQuestion;
    return newsecurityQuestion;
  }

}

export class LoginRequest {
  login: string;
  password: string;

  constructor(login: string, password: string){
    this.login = login;
    this.password = password;
  }
}
