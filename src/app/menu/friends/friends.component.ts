import {Component, Input, OnInit} from '@angular/core';
import {FriendRelation} from "../../model/FriendRelation";
import {DataService} from "../../data.service";
import {User} from "../../model/User";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  @Input()
  user: User;
  friendForm: FormGroup;
  invitedUsername: string;
  searchInput: string;
  isSearching = false;
  friends: Array<User>;
  invitations: Array<User>;
  dataLoaded = false;
  message = '';

  constructor(private dataService: DataService,
              private formBuilder: FormBuilder) { }

  loadData(){
    this.message = 'Loading data...';
    this.getFriends();
    this.friendForm = this.formBuilder.group(
      {
        inviteName: [this.invitedUsername, [Validators.required, Validators.minLength(4)]],
        inputName: [this.searchInput, [Validators.required, Validators.minLength(4)]]
      }
    );
    this.dataService.getFriendsByStatus(this.user.id, 'Invited').subscribe(
      next => {
        this.invitations = next;
        console.log(next);
        this.dataLoaded = true;
        this.message = '';
      }
    );

  }
  get inviteName(){ return this.friendForm.get('inviteName');}
  get inputName(){ return this.friendForm.get('inputName');}
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
  inviteUser(){
    let user1 = new User();
    user1.username = this.inviteName.value;
    let friendRelation = new FriendRelation();
    friendRelation.status = "Invited";
    friendRelation.senderUser = this.user;
    this.dataService.createFriendRelation(user1, friendRelation).subscribe(
     next =>{
       /*To do something */
       console.log("Invited");
     }
    );

  }

  searchUser() {
    if (this.friends.indexOf(this.friends.find(user => user.username === this.inputName.value)) > 0){
    this.friends.unshift(this.friends.splice(this.friends.findIndex(user => user.username === this.inputName.value), 1)[0]);
    }
    this.searchInput = '';
    this.isSearching = true;
  }

}
