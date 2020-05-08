import {EventEmitter, Injectable} from '@angular/core';
import {User} from './model/User';
import {Observable, of} from 'rxjs';
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Game} from "./model/Game";
import {MultiplayerGame} from "./model/MultiplayerGame";
import {FriendRelation} from "./model/FriendRelation";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  event: EventEmitter<User> = new EventEmitter<User>();

  constructor(private http: HttpClient) {
    console.log(environment.restUrl);

  }
  getUser(id: number): Observable<User>{
    return this.http.get<User>(environment.restUrl + '/api/users' + id);
  }

  getAllUsers(): Observable<Array<User>>{
    return this.http.get<Array<User>>(environment.restUrl + '/api/users');
  }

  updateUser(user:User): Observable<User>{
    return this.http.put<User>(environment.restUrl + '/api/users', user);
  }

  updatePhoto(user: User): Observable<User>{
    return of(null);
  }

  resetUserPassword(id: number) : Observable<any>  {
    return this.http.get(environment.restUrl + '/api/users/resetPassword/' + id);
  }

  getMaximumPoints(id: number): Observable<number>{
    return of(null);
  }

  getGames(): Observable<Array<Game>>{
    return this.http.get<Array<Game>>(environment.restUrl + '/api/games');
  }

  createGame(game: Game): Observable<Game>{
    return this.http.post<Game>(environment.restUrl + '/api/games', game);
  }

  joinGame(id: number): Observable<Game>{
    return this.http.put<Game>(environment.restUrl + '/api/games', id);
  }

  updateGame(game: Game): Observable<Game>{
    return this.http.put<Game>(environment.restUrl + '/api/games', game);
  }

  getAllMultiplayerGames(): Observable<Array<MultiplayerGame>>{
    return this.http.get<Array<MultiplayerGame>>(environment.restUrl + '/multiplayerGame');
  }

  getAllFriends():Observable<FriendRelation>{
    return this.http.get<FriendRelation>(environment.restUrl + '/api/friends');
  }
}

