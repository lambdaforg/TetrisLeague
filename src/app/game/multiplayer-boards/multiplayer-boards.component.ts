import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../model/User';
import {DataService} from '../../data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MultiplayerGame} from '../../model/MultiplayerGame';

@Component({
  selector: 'app-multiplayer-boards',
  templateUrl: './multiplayer-boards.component.html',
  styleUrls: ['./multiplayer-boards.component.css']
})
export class MultiplayerBoardsComponent implements OnInit {

  @Input()
  user: User;

  multiplayerGame: MultiplayerGame;
  otherPlayers: Array<User>;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.getCurrentMultiplayerGame(this.user.id)
      .subscribe(
        next => {
          this.multiplayerGame = next;
          this.otherPlayers = this.getOtherPlayers();
          console.log(this.otherPlayers);
        }
      );
  }

  getOtherPlayers(): Array<User> {
    const otherPlayers = new Array<User>();
    if (this.multiplayerGame.host.id !== this.user.id) {
      otherPlayers.push(this.multiplayerGame.host);
    }
    if (this.multiplayerGame.playerOne.id !== this.user.id) {
      otherPlayers.push(this.multiplayerGame.playerOne);
    }
    if (this.multiplayerGame.numberOfPlayers > 2) {
      if (this.multiplayerGame.playerTwo.id !== this.user.id) {
        otherPlayers.push(this.multiplayerGame.playerTwo);
      }
      if (this.multiplayerGame.numberOfPlayers > 3 && this.multiplayerGame.playerThree.id !== this.user.id) {
        otherPlayers.push(this.multiplayerGame.playerThree);
      }
    }
    return otherPlayers;
  }

}
