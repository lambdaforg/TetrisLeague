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
  user: User;
  friendRelations: Array<FriendRelation>;
  friends: Array<User>;
  invitations: Array<User>;
  dataLoaded = false;
  message = '';

  constructor(private dataService: DataService) { }

  loadData(){
    this.message = 'Loading data...';
    this.getFriends();
    this.dataService.getFriendsByStatus(this.user.id, 'Invited').subscribe(
      next => {
        this.invitations = next;
        console.log(next);
        this.dataLoaded = true;
        this.message = '';
      }
    );

  }
  getFriends(){
    this.dataService.getAllFriends(this.user.id).subscribe(
      next => {
        this.friends = next;
        this.dataLoaded = true;
        this.message = '';
      }
    );
  }

  ngOnInit(): void {
    this.loadData();
  }

  resposneInvite(idFrom: number, status: string){
    this.dataService.getFriendRelation(this.user.id, idFrom).subscribe(
        next => {
            const friendRelation = next;
            friendRelation.status = status;
            this.dataService.updateFriendRelation(friendRelation).subscribe(
              next2 => {
                console.log(next2)
                       this.getFriends();
                      const index = this.invitations.findIndex(p => p.id === next2.senderUser.id);
                      this.invitations.splice(index, 1);
              }
            );
        }
      )
  }

}
