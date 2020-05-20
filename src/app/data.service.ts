import {EventEmitter, Injectable} from '@angular/core';
import {User} from './model/User';
import {Observable, of} from 'rxjs';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Game} from './model/Game';
import {MultiplayerGame} from './model/MultiplayerGame';
import {FriendRelation} from './model/FriendRelation';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  event: EventEmitter<User> = new EventEmitter<User>();
  user: User;


  constructor(private http: HttpClient) {
    console.log(environment.restUrl);
    this.user = null;

  }

  createUser(newUser: User, password: string): Observable<User> {
    // const fullUser = {id: newUser.id, username: newUser.name, rankingsPoints: 2000, created_at: Date.valueOf(new Date()), password: password};
    // return this.http.post<User>(environment.restUrl + '/api/users', fullUser);
    return of(null);
  }

  getUserByLogin(login: string, password: string): Observable<User> {
    // const user = this.users.find(p => p.login === login);
    // if (user !== undefined && user.password === password) {
    //   return of(user);
    // }
    /**TO DO JWT**/
    const user1 = new User();
    user1.login = login;
    user1.password = password;
    console.log(user1);
    return this.http.post<User>(environment.restUrl + '/api/users/getauth', user1).pipe(
      map(data => {
          if (data !== null) {
            console.log(data);
            return User.fromHttp(data);
          }
          return null;
        }
      )
    );

  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(environment.restUrl + '/api/users/' + id).pipe(map(data => {
      return User.fromHttp(data);
    }));
  }

  getAllUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(environment.restUrl + '/api/users');
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(environment.restUrl + '/api/users', user);
  }

  uploadAvatar(id: number, avatar: File) {
    console.log(avatar);
    console.log(avatar.type);
    const fdAvatar = new FormData();
    let fileName: string;
    if (avatar.type === 'image/jpeg') {
      fileName = id.toString() + '.jpg';
    } else if (avatar.type === 'image/png') {
      fileName = id.toString() + '.png';
    } else {
      return null;
    }
    fdAvatar.append('avatar', avatar, fileName);
    console.log(fdAvatar);
    return this.http.post(environment.restUrl + '/api/avatars', fdAvatar);
  }

  getAvatar(userId: number): Observable<any> {
    return this.http.get<any>(environment.restUrl + '/api/avatars/' + userId)
      .pipe(
        map(data => {
          if (data) {
            return 'data:image/jpeg;base64,' + data.picByte;
          } else {
            return 'assets/img/avatar.png';
          }
        })
      );
  }

  resetUserPassword(id: number): Observable<any> {
    return this.http.get(environment.restUrl + '/api/users/resetPassword/' + id);
  }

  getMaximumScore(id: number): Observable<number> {
    return this.http.get<number>(environment.restUrl + '/api/games/getMaximumScore/' + id);
  }

  getGames(): Observable<Array<Game>> {
    return this.http.get<Array<Game>>(environment.restUrl + '/api/games');
  }

  createGame(game: Game): Observable<Game> {
    return this.http.post<Game>(environment.restUrl + '/api/games', game);
  }

  joinGame(id: number): Observable<Game> {
    return this.http.put<Game>(environment.restUrl + '/api/games', id);
  }

  updateGame(game: Game): Observable<Game> {
    return this.http.put<Game>(environment.restUrl + '/api/games', game);
  }

  getAllMultiplayerGames(): Observable<Array<MultiplayerGame>> {
    return this.http.get<Array<MultiplayerGame>>(environment.restUrl + '/api/multiplayerGame');
  }

  getAllFriends(id: number): Observable<Array<User>> {
    return this.http.get<Array<User>>(environment.restUrl + '/api/users/getfriends/' + id)
      .pipe(
        map(
          data => {
            const friends = new Array<User>();
            for (const friend of data) {
              friends.push(User.fromHttp(friend));
            }
            return friends;
          }
        )
      );
  }

  getFriendsByStatus(id: number, status: string) {
    return this.http.get<Array<User>>(environment.restUrl + '/api/friends/getinvitations/' + id + '/' + status)
      .pipe(
        map(
          data => {
            const friends = new Array<User>();
            for (const friend of data) {
              friends.push(User.fromHttp(friend));
            }
            return friends;
          }
        )
      );
  }

  getFriendRelation(id: number, idFrom: number) {
    return this.http.get<FriendRelation>(environment.restUrl + '/api/friends/' + id + '/' + idFrom)
      .pipe(
        map(
          data => {
            return FriendRelation.fromHttp(data);
          }
        )
      );
  }

  updateFriendRelation(friendRelation: FriendRelation): Observable<FriendRelation> {
    return this.http.put<FriendRelation>(environment.restUrl + '/api/friends', friendRelation);
  }

  createFriendRelation(user: User, friendRelation: FriendRelation) {
    return this.http.post<FriendRelation>(environment.restUrl + '/api/friends/byusername', {user, friendRelation});
  }

  getGeneralBestScores(): Observable<Array<Game>> {
    return this.http.get<Array<Game>>(environment.restUrl + '/api/games/getGeneralBestScores');
  }

  getPeriodBestScores(date1: string, date2: string): Observable<Array<Game>> {
    return this.http.get<Array<Game>>(environment.restUrl + '/api/games/getPeriodBestScores/' + date1 + '/' + date2);
  }
  // getRankingsPoints(){
  //
  // }

}
