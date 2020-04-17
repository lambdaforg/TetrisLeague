import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../model/User';
import {DataService} from '../data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user: User;
  points: number;
  action: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataService: DataService) { }

  ngOnInit(): void {
    // Testowy user
    this.dataService.getUser(0).subscribe(
      next => {
              this.user = next;
      }
    );

    // tutaj chodzi o to że bierzemy z takiego routa http://localhost:4200/menu?action=rankings  do zmiennej action rankings
    this.route.queryParams.subscribe(
      (params) => {
        this.action = params['action'];
      }
    );
    this.points = this.maxPoints();
  };

    // metoda ktora nam wlasnie tworzy taki routing np  http://localhost:4200/menu?action=rankings
  redirectTo(pathAction: string) {
    this.router.navigate(['menu'], {queryParams : {action: pathAction}});
  }

  maxPoints(): number{
      return this.dataService.getMaximumPoints(this.user.id);
  }



}
