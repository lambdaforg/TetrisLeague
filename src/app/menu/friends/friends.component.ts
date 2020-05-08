import {Component, Input, OnInit} from '@angular/core';
import {FriendRelation} from "../../model/FriendRelation";
import {DataService} from "../../data.service";
import {User} from "../../model/User";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  @Input()
  user:User;
  friendRelations: Array<FriendRelation>;
  friends: Array<User>;
  dataLoaded = false;
  message = '';

  constructor(private dataService: DataService) { }

  loadData(){
    this.message = 'Loading data...';
    this.dataService.getAllFriends(this.user.id).subscribe(
      next => {
        this.friends = next;
        console.log(this.friends);
        this.dataLoaded = true;
        this.message = '';
      }
    );
  }

  ngOnInit(): void {
    this.loadData();
  }

}
