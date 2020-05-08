import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../model/User';
import {DataService} from '../data.service';
import {of, Subscription} from 'rxjs';
import {StatsService} from './stats/classes/stats.service';
import {formatDate} from "@angular/common";
import {Game} from "../model/Game";
import {max} from "rxjs/operators";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  user: User;
  maxScore: number;
  action: string;
  subscription: any;
  favouriteStatsSubscription: Subscription;
  statsFavourite: string;
  dataLoaded = false;
  message = '';
  games : Array<Game>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataService: DataService,
              private statsService: StatsService) {
  }

  ngOnInit(): void {
    this.loadData();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.favouriteStatsSubscription.unsubscribe();
  }

  loadData(){
    this.message = 'Loading data...';

    this.dataService.getUser(2).subscribe(
      next => {
        this.user = next;
        //this.dataService.getGames().subscribe(
       //   next => {
         //   this.games = next
        //    this.getMaxPoints();
       //  }
      //  );
        this.dataLoaded = true;
        this.message = '';
      },
      error => this.message = 'Sorry - the data could not be loaded.'
    );
    this.route.queryParams.subscribe(
      (params) => {
        this.action = params.action;
      }
    );
    this.subscription = this.dataService.event.subscribe(
      next => {
        this.user = next;
        this.getMaxPoints();
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
  }

  getMaxPoints(){
    // const userGames = this.games.filter(game => game.user === this.user);
    // let max = userGames[0].score;
    // for (const i of userGames){
    //   if (i.score > max){
    //     max = i.score;
    //   }
    // }
    this.maxScore = 5;
  }

  // metoda ktora nam wlasnie tworzy taki routing np  http://localhost:4200/menu?action=rankings
  redirectTo(pathAction: string) {
    this.router.navigate(['menu'], {queryParams: {action: pathAction}});
  }
}
