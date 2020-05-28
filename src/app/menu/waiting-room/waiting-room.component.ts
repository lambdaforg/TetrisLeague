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
    let newGame = new MultiplayerGame(
      this.user,
      this.newGameForm.value.numberOfPlayers,
      this.newGameForm.value.bet
    );
    this.dataService.createMultiplayerGame(newGame).subscribe(
      next => {
        newGame = next;
        this.loadData();
      }
    );
    const modalRef = this.modalService.open(RoomModalComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.game = newGame;
    modalRef.componentInstance.user = this.user;
    modalRef.result.then(
      (result) => {
        if (result === 'start') {
          this.gameStartedEvent.emit();
        } else if (result === 'deleted') {
          this.dataService.deleteMultiplayerGame(newGame.id)
            .subscribe(
              next => {
                if (next) {
                  this.loadData();
                }
              }, e => {
                console.log(e.message);
              }
            );
        }
      });
  }

  // TODO: joining game
  public joinRoom() {
    const modalRef = this.modalService.open(RoomModalComponent);
    modalRef.componentInstance.user = this.user;
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
        bet: [[Validators.required, Validators.min(1)]],
        numberOfPlayers: [Validators.required]
      });
  }

}


