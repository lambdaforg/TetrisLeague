import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder,Validators} from "@angular/forms";
import {User} from "../model/User";
import {DataService} from "../data.service";
import {state} from "@angular/animations";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  loginForm: FormGroup;

  loginArray = { name: '', password: ''};


  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login:  [this.loginArray.name, [Validators.required, Validators.minLength(4)]],
      password:  [this.loginArray.password, [Validators.required, Validators.minLength(7)]]});
  }

  get login(){ return this.loginForm.get('login');}
  get password(){ return this.loginForm.get('password');}

  submit(){
      this.dataService.getUserByLogin(this.login.value, this.password.value).subscribe(
        (good) =>{
          //to do logowanie
          if(good !== null)
          this.redirectToMenu();

        }
      );

  }

  redirectToRegister(){
    this.router.navigate(['register']);
  }

  redirectToMenu(){
    this.router.navigate(['menu']);
  }

}
