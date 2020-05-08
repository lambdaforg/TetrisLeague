import {EventEmitter, Injectable} from '@angular/core';
import {User} from './model/User';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  users: Array<User>;
  event: EventEmitter<User> = new EventEmitter<User>();

  constructor() {
    //console.log(environment.restUrl);
    this.users = new Array<User>();
    const user1 = new User();
    user1.id = 0;
    user1.password = 'test';
    user1.login = 'test1';
    user1.name = 'Username';
    user1.points.push(0);
    this.users.push(user1);
  }
  createUser(user: User): Observable<User>{
    user.id = this.users.length + 1;
    this.users.push(user);
    return of(user);
  }
  getUserByLogin(login: string, password: string): Observable<User> {
    const user = this.users.find(p => p.login === login);
    if (user !== undefined && user.password === password) {
      return of(user);
    }
    return of(null);
  }
  getUser(id: number): Observable<User>{
    return of(this.users.find(p => p.id === id ));
  }
  updateUser(user: User): Observable<User>{
    let user1 = this.users.find(p => p.id === user.id);
    user1.points = user.points;
    user1.password = user.password;
    return of(user1);
  }
  getMaximumPoints(id: number): Observable<number>{
    let arrays = this.users.find(p => p.id === id).points;
    let max = arrays[0];
    for(let i = 0 ; i < arrays.length; i++){
      if(arrays[i] > max)
        max = arrays[i];
    }
    return of(max);
  }

}
