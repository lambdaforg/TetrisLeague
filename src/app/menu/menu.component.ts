import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  action: string;

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    // tutaj chodzi o to że bierzemy z takiego routa http://localhost:4200/menu?action=rankings  do zmiennej action rankings
    this.route.queryParams.subscribe(
      (params) => {
        this.action = params['action'];
      }
    );
  };

    // metoda ktora nam wlasnie tworzy taki routing np  http://localhost:4200/menu?action=rankings
  redirectTo(pathAction: string) {
    this.router.navigate(['menu'], {queryParams : {action: pathAction}});
  }




}
