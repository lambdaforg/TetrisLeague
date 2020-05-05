import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router ) { }

  ngOnInit(): void {
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
