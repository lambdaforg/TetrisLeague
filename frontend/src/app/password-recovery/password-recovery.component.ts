import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Questions, User} from '../model/User';
import {DataService} from "../data.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MustMatch} from "../model/form/MustMatch";
import {AuthService} from "../services/auth.service";
import {TokenStorageService} from "../services/token-storage.service";

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {

  questions: Array<Questions>;
  recoveryState: string;
  formRegister: FormGroup;
  register = { name: '', password: '', confirmPassword: '', answer0: '', answer1: '', question1: Questions, question2: Questions};
  option1: string;
  option2: string;
  user: User;
  errorMessage: string;


  constructor(private router: Router,
              private dataService: DataService,
              private authService: AuthService,
              private tokenStorageService: TokenStorageService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.recoveryState = 'verification';
    this.dataService.getAllSecurityQuestions().subscribe(
      data => {
        console.log(data);
        this.questions = data;
      }
    )
    console.log(this.questions);
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


      verifyUser() {
        this.recoveryState = 'new-password';
      }
      redirectToMenu() {
        this.router.navigate(['menu']);
      }
      redirectToLogin() {
        this.router.navigate(['login']);
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
        if(typeof (this.formRegister.get('question1').value) != typeof('')){
          this.user.question1 = this.option1;
        }
        if(typeof (this.formRegister.get('question2').value) != typeof('')){
          this.user.question2 = this.option2;
        }

        console.log(typeof (this.formRegister.get('question1').value));
        console.log(this.user);

        this.authService.changePassword(this.user).subscribe(
          data => {
            console.log(data);

            this.redirectToMenu();

          },
          err => {
            this.errorMessage = err.error.message;
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
