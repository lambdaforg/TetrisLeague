import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Questions} from '../model/User';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {

  questions = Questions;
  recoveryState: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.recoveryState = 'verification';
  }

  verifyUser() {
    this.recoveryState = 'new-password';
  }

  redirectToRegister() {
    this.router.navigate(['register']);

  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }
}
