import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Questions, User} from '../model/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  questions = Questions;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirectToLogin(){
    this.router.navigate(['login']);
  }
}
