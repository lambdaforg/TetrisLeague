import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Questions, User} from '../model/User';
import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import {MustMatch} from "../model/form/MustMatch";
import {DataService} from "../data.service.local";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  questions = Questions;
  formRegister: FormGroup;
  register = { name: 'Login', password: 'Password', confirmPassword: 'Password', answer0: '', answer1: '', question1: this.questions.question1, question2: this.questions.question2};


  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private dataService: DataService) { }

  ngOnInit(): void {
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
  }


  get name() { return this.formRegister.get('name'); }
  get password(){ return this.formRegister.get('password');}
  get confirmPassword(){ return this.formRegister.get('confirmPassword');}
  get answer1(){ return this.formRegister.get('answer1');}
  get answer2(){ return this.formRegister.get('answer2');}
  get f() { return this.formRegister.controls; }

  redirectToLogin(){
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

    this.dataService.createUser(this.user).subscribe(
      (good) =>{
        this.dataService.event.emit(good);
        this.router.navigate(['/login']);
      }

    )
  }
}
