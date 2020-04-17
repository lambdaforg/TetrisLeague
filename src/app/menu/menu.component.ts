import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../model/User';
import {DataService} from '../data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {


  user: User;
  points: number;
  action: string
  subscription: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getUser(0).subscribe(
      next => {
              this.user = next;
      }
    );
    this.route.queryParams.subscribe(
      (params) => {
        this.action = params['action'];
      }
    );
    this.points = this.maxPoints();
    this.subscription = this.dataService.event.subscribe(
      next =>{
        this.user = next;
        this.points = this.maxPoints();
      },
      error => {
        this.user = error;
        this.points = this.maxPoints();
        console.log(this.user.points);
      },
      nextt => {
        this.user = nextt;
        this.points = this.maxPoints();
        console.log(this.user.points);
      }
    );
  };
  ngOnDestroy(): void {
      this.subscription.unsubscribe;
  }
    // metoda ktora nam wlasnie tworzy taki routing np  http://localhost:4200/menu?action=rankings
  redirectTo(pathAction: string) {
    console.log(this.user);
    this.router.navigate(['menu'], {queryParams : {action: pathAction}});
  }

  maxPoints(): number{
      return this.dataService.getMaximumPoints(this.user.id);
  }



}
