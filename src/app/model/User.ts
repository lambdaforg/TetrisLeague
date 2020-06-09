// Taki mockup na chwile kiedy jeszcze nie mamy backendu.
import {Role} from "./Role";

export class User {
  id: number;
  username: string;
  login: string;
  password: string;

  // points: Array<number> = [];
  created_At: Date;
  //question1: SecurityQuestion;
  //question2: SecurityQuestion;
  question1: string;
  question2: string;
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
    newUser.question1 = user.question1;
    newUser.question2 = user.question2;
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
    newUser.created_At = user.created_At;
    return newUser;
  }


}

export class Questions{
  id: number;
  question: string;
  static fromHttp(question: Questions): Questions{
      const newQuestion = new Questions();
      newQuestion.id = question.id
      newQuestion.question = question.question;
      return newQuestion;
  }
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
