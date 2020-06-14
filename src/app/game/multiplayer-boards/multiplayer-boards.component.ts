import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../model/User';
import {DataService} from '../../data.service';
import {MultiplayerGame} from '../../model/MultiplayerGame';
import {MultiplayerService} from '../../services/multiplayer.service';
import {Move} from '../../model/Move';

@Component({
  selector: 'app-multiplayer-boards',
  templateUrl: './multiplayer-boards.component.html',
  styleUrls: ['./multiplayer-boards.component.css']
})
export class MultiplayerBoardsComponent implements OnInit {

  @Input()
  multiplayerGameId: number;

  @Input()
  user: User;

  multiplayerGame: MultiplayerGame;
  otherPlayers: Array<User>;
  isInitialized = false;

  constructor(private dataService: DataService,
              private multiplayerService: MultiplayerService) {
  }

  ngOnInit(): void {
    this.dataService.getCurrentMultiplayerGame(this.user.id)
      .subscribe(
        next => {
          this.multiplayerGame = next;
          this.otherPlayers = this.getOtherPlayers();
          this.isInitialized = true;
          this.receiveMessage();
        },
        error => {
          console.log(error.message);
        });
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

  receiveMessage(): void {
    console.log(this.multiplayerService.connect(this.multiplayerGame.id));
  }

  sendMove(move: Move) {
    //this.multiplayerService.sendMessage(this.multiplayerGame.id, move);
  }

}
