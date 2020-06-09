import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Questions} from '../model/User';
import {DataService} from "../data.service";

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {

  questions: Array<Questions>;
  recoveryState: string;

  constructor(private router: Router,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.recoveryState = 'verification';
    this.dataService.getAllSecurityQuestions().subscribe(
      data => {
        console.log(data);
        this.questions = data;
      }
    )
    console.log(this.questions);
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
