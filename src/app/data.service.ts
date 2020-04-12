import { Injectable } from '@angular/core';
import {User} from './model/User';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  users: Array<User>;

  constructor() {
      this.users = new Array<User>();
      const user1 = new User();
      user1.id = 0;
      user1.password = 'test';
      user1.login = 'test1';
      user1.name = "Username";
      user1.points = 0;
      this.users.push(user1);
  }

  //getUsers(): Observable<Array<User>> {
  //      return of(this.users);
  //}

    getUser(id: number): Observable<User>{
        return of(this.users.find(p => p.id === id ));
    }


}
