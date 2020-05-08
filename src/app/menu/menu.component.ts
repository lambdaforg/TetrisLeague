import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../model/User';
import {DataService} from '../data.service';
import {Subscription} from 'rxjs';
import {StatsService} from './stats/classes/stats.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  user: User;
  points: number;
  action: string;
  subscription: any;
  favouriteStatsSubscription: Subscription;
  statsFavourite: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataService: DataService,
              private statsService: StatsService) {
  }

  ngOnInit(): void {
    this.dataService.getUser(0).subscribe(
      next => {
        this.user = next;
      }
    );
    this.route.queryParams.subscribe(
      (params) => {
        this.action = params.action;
      }
    );
    this.dataService.getMaximumPoints(this.user.id).subscribe(
      next => this.points = next
    );
    this.subscription = this.dataService.event.subscribe(
      next => {
        this.user = next;
        // this.points = this.maxPoints();
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
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.favouriteStatsSubscription.unsubscribe();
  }

  // metoda ktora nam wlasnie tworzy taki routing np  http://localhost:4200/menu?action=rankings
  redirectTo(pathAction: string) {
    this.router.navigate(['menu'], {queryParams: {action: pathAction}});
  }
}
