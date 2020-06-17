import {EventEmitter, Injectable} from '@angular/core';
import {Questions, User} from './model/User';
import {Observable, of, throwError} from 'rxjs';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Game} from './model/Game';
import {MultiplayerGame} from './model/MultiplayerGame';
import {FriendRelation} from './model/FriendRelation';
import {map} from 'rxjs/operators';
import {RankingPoint} from './model/RankingPoint';
import {CustomerSatisfaction} from './model/CustomerSatisfaction';


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

  uploadAvatar(id: number, avatar: File): Observable<any> {
    console.log(avatar);
    console.log(avatar.type);
    const fdAvatar = new FormData();
    let fileName: string;
    if (avatar.type === 'image/jpeg') {
      fileName = id.toString() + '.jpg';
    } else if (avatar.type === 'image/png') {
      fileName = id.toString() + '.png';
    } else {
      throwError('Invalid data type');
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

  updateGame(game: Game): Observable<Game> {
    return this.http.put<Game>(environment.restUrl + '/api/games', game);
  }

  getAllSecurityQuestions(): Observable<Array<Questions>> {
    return this.http.get<Array<Questions>>(environment.restUrl + '/api/users/getQuestions')
      .pipe(
        map(
          data => {
            const questions = new Array<Questions>();
            for (const question of data) {
              console.log(question);
              questions.push(Questions.fromHttp(question));
            }
            return questions;
          }
        )
      );
  }

  getAllMultiplayerGames(): Observable<Array<MultiplayerGame>> {
    return this.http.get<Array<MultiplayerGame>>(environment.restUrl + '/api/multiplayerGame');
  }

  getAllFriends(id: number): Observable<Array<User>> {
    return this.http.get<Array<User>>(environment.restUrl + '/api/friends/getfriends/' + id)
      .pipe(
        map(
          data => {
            const friends = new Array<User>();
            for (const friend of data) {
              friends.push(User.friendFromHttp(friend));
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
              friends.push(User.friendFromHttp(friend));
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
    console.log(date1);
    console.log(date2);
    return this.http.get<Array<Game>>(environment.restUrl + '/api/games/getPeriodBestScores/' + date1 + '/' + date2);
  }

  getCurrentRankingsPoints(id: number): Observable<number> {
    return this.http.get<number>(environment.restUrl + '/api/rankingPoints/' + id);
  }

  getRankingsPoints(): Observable<Array<RankingPoint>> {
    return this.http.get<Array<RankingPoint>>(environment.restUrl + '/api/rankingPoints/getBestRankingPoints');
  }

  getAllPendingMultiplayerGames(): Observable<Array<MultiplayerGame>> {
    return this.http.get<Array<MultiplayerGame>>(environment.restUrl + '/api/multiplayer-games/getPendingMultiplayerGames');
  }

  createMultiplayerGame(multiplayerGame: MultiplayerGame): Observable<MultiplayerGame> {
    return this.http.post<MultiplayerGame>(environment.restUrl + '/api/multiplayer-games', multiplayerGame);
  }

  deleteMultiplayerGame(gameId: number): Observable<any> {
    return this.http.delete(environment.restUrl + '/api/multiplayer-games/' + gameId);
  }

  joinMultiplayerGame(gameId: number, userId: number): Observable<MultiplayerGame> {
    return this.http.put<MultiplayerGame>(environment.restUrl + '/api/multiplayer-games/join/' + gameId, userId);
  }

  leaveMultiplayerGame(gameId: number, userId: number): Observable<MultiplayerGame> {
    return this.http.put<MultiplayerGame>(environment.restUrl + '/api/multiplayer-games/leave/' + gameId, userId);
  }

  getMultiplayerGame(gameId: number): Observable<MultiplayerGame> {
    return this.http.get<MultiplayerGame>(environment.restUrl + '/api/multiplayer-games/' + gameId);
  }

  changeMultiplayerGameStatus(gameId: number, newStatus: string): Observable<MultiplayerGame> {
    return this.http.put<MultiplayerGame>(environment.restUrl + '/api/multiplayer-games/changeStatus/' + gameId, newStatus);
  }

  setMultiplayerGameWinner(gameId: number, winnerId: number): Observable<MultiplayerGame> {
    return this.http.put<MultiplayerGame>(environment.restUrl + '/api/multiplayer-games/setWinner/' + gameId, winnerId);
  }

  getCurrentMultiplayerGame(userId: number): Observable<MultiplayerGame> {
        return this.http.get<MultiplayerGame>(environment.restUrl + '/api/multiplayer-games/getCurrentGame/' + userId);
  }

  getUserPeriodBestScores(userId: number, date1: string, date2: string): Observable<Array<string>> {
    console.log(date1);
    console.log(date2);
    // let obtained: string[] = [];
    // const result: Array<Array<string>> = new Array<Array<string>>();
    // // @ts-ignore
    return this.http.get<Array<string>>(environment.restUrl + '/api/games/getUserPeriodBestScores/' + userId + '/' + date1 + '/' + date2);
    // for (const i of Object.keys(obtained)){
    //   result[result.length] = (obtained[i] + ' ').split(',');
    // }
    // // @ts-ignore
    // return result;
  }

  getUserPeriodCurrentRankingsPoints(userId: number, date1: string, date2: string): Observable<Array<string>> {
    return this.http.get<Array<string>>(environment.restUrl + '/api/rankingPoints/getUserPeriodCurrentRankingsPoints/' + userId + '/' + date1 + '/' + date2);
  }

  getPeriodGamers(date1: string, date2: string): Observable<Array<string>> {
    return this.http.get<Array<string>>(environment.restUrl + '/api/users/getPeriodGamers/' + date1 + '/' + date2);
  }

  addNewCustomerSatisfaction(newCustomerSatisfaction: CustomerSatisfaction): Observable<CustomerSatisfaction> {
    console.log(newCustomerSatisfaction.assesingDate);
    console.log(newCustomerSatisfaction.assesingUser);
    // const assesingDate = newCustomerSatisfaction.assesingDate;
    return this.http.get<CustomerSatisfaction>(environment.restUrl + '/api/customerSatisfaction/' + newCustomerSatisfaction.assesingUser.id + '/' + newCustomerSatisfaction.assesingDate + '/' + newCustomerSatisfaction.assesment);
  }
}
