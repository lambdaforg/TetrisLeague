import {EventEmitter, Injectable} from '@angular/core';
import {User} from './model/User';
import {Observable, of} from 'rxjs';
import {Game} from './model/Game';
import {environment} from '../environments/environment';
import {MultiplayerGame} from './model/MultiplayerGame';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  users: Array<User>;
  event: EventEmitter<User> = new EventEmitter<User>();

  constructor() {
    this.users = new Array<User>();
    const user1 = new User();
    user1.id = 0;
    user1.password = 'test';
    user1.login = 'test1';
    user1.username = 'Username';
    user1.rankingsPoints = 0;
    this.users.push(user1);
  }

  createUser(user: User): Observable<User> {
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

  getUser(id: number): Observable<User> {
    return of(this.users.find(p => p.id === id));
  }

  getAllUsers(): Observable<Array<User>> {
    return of(null);
  }

  updateUser(user: User): Observable<User> {
    const user1 = this.users.find(p => p.id === user.id);
    user1.rankingsPoints = user.rankingsPoints;
    user1.password = user.password;
    return of(user1);
  }

  uploadAvatar(id: number, avatar: File) {
    return of(null);
  }

  getAvatar(userId: number): Observable<any> {
    return of(null);
  }

  resetUserPassword(id: number): Observable<any> {
    return of(null);
  }


  getMaximumScore(id: number): Observable<number> {
    /*  let arrays = this.users.find(p => p.id === id).scores;
      let max = arrays[0];
      for(let i = 0 ; i < arrays.length; i++){
        if(arrays[i] > max)
          max = arrays[i];
      }
      return of(max);*/

    return of(0);
  }

  getGames(): Observable<Array<Game>> {
    return of(null);
  }

  createGame(game: Game): Observable<Game> {
    return of(null);
  }

  joinGame(id: number): Observable<Game> {
    return of(null);
  }

  updateGame(game: Game): Observable<Game> {
    return of(null);
  }

  getAllMultiplayerGames(): Observable<Array<MultiplayerGame>> {
    return of(null);
  }

  getAllFriends(id: number): Observable<Array<User>> {
    return of(null);
  }

  getGeneralBestScores(): Observable<Array<Game>> {
    return of(null);
  }

  getPeriodBestScores(): Observable<Array<Game>> {
    return of(null);
  }

  // getRankingsPoints(){
  //
  // }
}
