import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

const AUTH_API = environment.restUrl + '/api/users/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginRequest): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      login: loginRequest.login,
      password: loginRequest.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      login: user.login,
      password: user.password,
      question1: user.question1,
      question2: user.question2,
      answer1: user.answer1,
      answer2: user.answer2
    }, httpOptions);
  }
  changePassword(user): Observable<any> {
    return this.http.post(AUTH_API + 'changePassword', {
      login: user.login,
      password: user.password,
      question1: user.question1,
      question2: user.question2,
      answer1: user.answer1,
      answer2: user.answer2
    }, httpOptions);
  }
}
