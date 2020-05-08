// Taki mockup na chwile kiedy jeszcze nie mamy backendu.
export class User {
  id: number;
  username: string;
  rankingsPoints: number;
  login: string;
  password: string;

  // points: Array<number> = [];
  created_At: Date;
  question1: SecurityQuestion;
  question2: SecurityQuestion;
  // Questions: Array<Questions> = [];
  answer1: string;
  answer2: string;

  static fromHttp(user: User) : User {
    const newUser = new User();
    newUser.id = user.id;
    newUser.username = user.username;
    newUser.rankingsPoints = user.rankingsPoints;
    newUser.created_At = user.created_At;
    newUser.question1 = SecurityQuestion.fromHttp(user.question1);
    newUser.question2 = SecurityQuestion.fromHttp(user.question2);
    newUser.answer1 = user.answer1;
    newUser.answer2 = user.answer2;
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
