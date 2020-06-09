import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Questions, User} from '../model/User';
import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import {MustMatch} from "../model/form/MustMatch";
import {DataService} from "../data.service";
import {AuthService} from "../services/auth.service";
import {TokenStorageService} from "../services/token-storage.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  questions: Array<Questions>;
  formRegister: FormGroup;
  register = { name: 'Login', password: 'Password', confirmPassword: 'Password', answer0: '', answer1: '', question1: Questions, question2: Questions};

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  option1 = '';
  option2 = '';

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private dataService: DataService,
              private authService: AuthService,
              private tokenStorageService: TokenStorageService) { }
  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.redirectToMenu();
    }
    this.dataService.getAllSecurityQuestions().subscribe(
      data => {
        this.questions = data;
        console.log(this.questions.length);
        this.option1 = this.register.question1.fromHttp(this.questions[0]).question;
        this.option2 = this.register.question1.fromHttp(this.questions[1]).question;

      }
    )

    this.user = new User();

    this.formRegister = this.formBuilder.group({
      name:  [this.register.name, [Validators.required, Validators.minLength(4)]],
      password:  [this.register.password, [Validators.required, Validators.minLength(7)]],
      confirmPassword:  [this.register.confirmPassword, [Validators.required]],
      answer1: [this.register.answer0, Validators.required],
      answer2: [this.register.answer1, Validators.required],
      question1: [this.register.question1],
      question2: [this.register.question2]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  };


  get name() { return this.formRegister.get('name'); }
  get password(){ return this.formRegister.get('password');}
  get confirmPassword(){ return this.formRegister.get('confirmPassword');}
  get answer1(){ return this.formRegister.get('answer1');}
  get answer2(){ return this.formRegister.get('answer2');}
  get f() { return this.formRegister.controls; }

  redirectToLogin(){
    this.router.navigate(['login']);
  }
  redirectToMenu(){
    this.router.navigate(['menu']);
  }
  submit(){
    this.user.login = this.name.value;
    this.user.password = this.password.value;
    this.user.answer1 = this.answer1.value;
    this.user.answer2 = this.answer2.value;
    this.user.username = this.name.value;
    this.user.question1 = this.formRegister.get('question1').value;
    this.user.question2 = this.formRegister.get('question2').value;
    this.user.created_At = new Date();

    console.log(typeof (this.formRegister.get('question1').value));
    console.log(this.user);

    /*
    this.dataService.createUser(this.user).subscribe(
      (good) =>{
        this.dataService.event.emit(good);
        this.router.navigate(['/login']);
      }

    )*/

    this.authService.register(this.user).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.redirectToMenu();

      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );


  }
  isQuestionToHide(question1: Questions, question2: string):Boolean{
    if(question1.question === question2){
      return true;
    }
    if(question2 === this.option1){
        return true;
    }
      return false;
  }
  isQuestionToHide2(question2: Questions, question1: string):Boolean{
    if(question2.question === question1){
      return true;
    }
    if(question1 === this.option2){
      return true;
    }
    return false;
  }

}
