import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../model/User';
import {DataService} from '../data.service';
import {Subscription} from 'rxjs';
import {StatsService} from './stats/classes/stats.service';
import {AuthService} from '../services/auth.service';
import {TokenStorageService} from '../services/token-storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  user: User;
  maxScore: number;
  currentRankingsPoints: number;
  action: string;
  subscription: any;
  favouriteStatsSubscription: Subscription;
  statsFavourite: string;
  dataLoaded = false;
  message = '';
  avatar: any;
  isLoggedIn = false;
  roles: string[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataService: DataService,
              private statsService: StatsService,
              private authService: AuthService,
              private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.favouriteStatsSubscription.unsubscribe();
  }

  loadData() {
      this.message = 'Loading data...';

    if (this.tokenStorage.getToken()) {
      console.log("test");
      this.isLoggedIn = true;
      this.user = new User();
      this.user.username = this.tokenStorage.getUser().username
      this.user.login = this.user.username;
      this.user.id = this.tokenStorage.getUser().id;

      console.log(this.user);
      this.roles = this.tokenStorage.getUser().roles;
      this.getMaxPoints();
      this.dataLoaded = true;
      console.log("test");
      this.message = '';

    }
    else{
      this.router.navigate(['login']);
    }
    /* if (this.dataService.user !== null) {
       this.user = this.dataService.user;
       this.loadAvatar();
       this.getMaxPoints();
       this.getCurrentRankingsPoints();
       this.dataLoaded = true;
       this.message = '';
    }*/
    /*
    this.dataService.getUser(0).subscribe(
       next => {
         this.user = next;
         this.getMaxPoints();
         this.dataLoaded = true;
         this.message = '';
       },
       error => this.message = 'Sorry - the data could not be loaded.'
     );*/
    this.route.queryParams.subscribe(
      (params) => {
        this.action = params.action;
      }
    );
    this.subscription = this.dataService.event.subscribe(
      next => {
        this.user = next;
        this.getMaxPoints();
        this.getCurrentRankingsPoints();
      },
      error => {
        // Handle error
      },
      complete => {
      }
    );

    this.favouriteStatsSubscription = this.statsService.favouriteStatsEventEmitter.subscribe(
      favourite => this.statsFavourite = favourite
    );
    console.log("test2");
  }

  getMaxPoints() {
    this.dataService.getMaximumScore(this.user.id).subscribe(
      next => {
        this.maxScore = next;
      }
    );
  }

  getCurrentRankingsPoints(){
    this.dataService.getCurrentRankingsPoints(this.user.id).subscribe(
      next => {
        this.currentRankingsPoints = next;
      }
    );
  }

  // metoda ktora nam wlasnie tworzy taki routing np  http://localhost:4200/menu?action=rankings
  redirectTo(pathAction: string) {
    this.router.navigate(['menu'], {queryParams: {action: pathAction}});
  }

  logOut() {
    this.dataService.user = null;
    this.tokenStorage.signOut();
    this.router.navigate(['login']);

  }

  loadAvatar() {
    this.dataService.getAvatar(this.user.id)
      .subscribe(
        data => {
          this.avatar = data;
        }
      );
  }

}
