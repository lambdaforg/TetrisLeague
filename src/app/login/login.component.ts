import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder,Validators} from "@angular/forms";
import {LoginRequest, User} from "../model/User";
import {DataService} from "../data.service";
import {AuthService} from "../services/auth.service";
import {TokenStorageService} from "../services/token-storage.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  loginForm: FormGroup;

  loginArray = { name: '', password: ''};

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private dataService: DataService,
              private authService: AuthService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login:  [this.loginArray.name, [Validators.required, Validators.minLength(4)]],
      password:  [this.loginArray.password, [Validators.required, Validators.minLength(7)]]});

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.redirectToMenu();
    }
  }

  get login(){ return this.loginForm.get('login');}
  get password(){ return this.loginForm.get('password');}

  submit(){

    this.authService.login(new LoginRequest(this.login.value, this.password.value)).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.redirectToMenu();
      //  this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );

   /*  this.dataService.getUserByLogin(this.login.value, this.password.value).subscribe(
        (good) => {
          //to do logowanie
          if (good !== null) {
          this.dataService.user = good;
          this.redirectToMenu();
        }

        }
      );*/
   /*   this.dataService.getUser(0).subscribe(   (good) => {
        //to do logowanie
        if (good !== null) {
          this.dataService.user = User.fromHttp(good);
          this.redirectToMenu();
        }

      });*/
  }

  redirectToRegister() {
    this.router.navigate(['register']);
  }

  redirectToMenu() {
    this.router.navigate(['menu']);
  }

  redirectToPasswordRecovery() {
    this.router.navigate(['password-recovery']);
  }

}
