import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RoomModalComponent} from './room-modal/room-modal.component';
import {User} from '../../model/User';
import {Router} from '@angular/router';
import {MultiplayerGame} from '../../model/MultiplayerGame';
import {DataService} from '../../data.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css']
})
export class WaitingRoomComponent implements OnInit {

  @Input()
  user: User;

  selectedNavbar: string;
  games: Array<MultiplayerGame>;

  newGameForm: FormGroup;
  multiplayerGame: MultiplayerGame;

  interval: any;

  @Output()
  gameStartedEvent = new EventEmitter();

  constructor(private modalService: NgbModal,
              private router: Router,
              private dataService: DataService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.selectedNavbar = 'filter';
    this.loadData();
    this.interval = setInterval(
      () => {
        this.loadData();
      }, 1000);
    this.initializeNewGameForm();
  }

  loadData() {
    this.dataService.getAllPendingMultiplayerGames()
      .subscribe(
        next => {
          this.games = next;
        }, error => {
          console.log(error.message);
        }
      );

  }

  changeNavbar(selectedNavbar: string) {
    this.selectedNavbar = selectedNavbar;
  }

  // creating new room
  public createRoom() {
    const newGame = new MultiplayerGame(
      this.user,
      this.newGameForm.value.numberOfPlayers,
      this.newGameForm.value.bet,
      false
    );
    this.dataService.createMultiplayerGame(newGame).subscribe(
      next => {
        this.loadData();
        this.openRoomModal(next);
      }
    );
  }

  public joinRoom(gameId: number) {
    this.dataService.joinMultiplayerGame(gameId, this.user.id)
      .subscribe(
        next => {
          this.multiplayerGame = next;
          this.loadData();
          this.openRoomModal(next);
        }
      );
    console.log('after adding player' + this.multiplayerGame);
  }

  // opens room modal and handles several results
  private openRoomModal(game: MultiplayerGame) {
    console.log('on method start ' + game.id);
    const modalRef = this.modalService.open(RoomModalComponent, {
      backdrop: 'static'
    });
    console.log('new game ' + game);
    modalRef.componentInstance.game = game;
    modalRef.componentInstance.user = this.user;
    modalRef.result.then(
      (result) => {
        if (result === 'start') {
          this.dataService.changeMultiplayerGameStatus(game.id, 'started')
            .subscribe(
              next => {
                if (next) {
                  this.gameStartedEvent.emit();
                }
              }
            );
        } else if (result === 'deleted') {
          console.log('id before deleting ' + game.id);
          this.dataService.deleteMultiplayerGame(game.id)
            .subscribe(
              next => {
                if (next) {
                  this.loadData();
                }
              }, e => {
                console.log(e.message);
              }
            );
        } else {
          console.log('user ' + this.user.id + ' leaves ' + game.id);
          this.dataService.leaveMultiplayerGame(game.id, this.user.id)
            .subscribe(
              next => {
                this.loadData();
              }, error => {
                console.log(error.message);
              }
            );
        }
      });
  }

  public getCurrentPlayersNumber(game: MultiplayerGame) {
    let result = 1;
    if (game.playerOne != null) {
      result++;
      if (game.playerTwo != null) {
        result++;
        if (game.playerThree != null) {
          result++;
        }
      }
    }
    return result;
  }

  public initializeNewGameForm() {
    this.newGameForm = this.formBuilder.group(
      {
        bet: [ 100, [Validators.required, Validators.min(1)]],
        numberOfPlayers: [ 2, Validators.required]
      });
  }

}


