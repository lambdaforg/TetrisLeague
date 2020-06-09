import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../../model/User';
import {MultiplayerGame} from '../../../model/MultiplayerGame';
import {DataService} from '../../../data.service';
import {error} from '@angular/compiler/src/util';

// dialog shown when player wants to leave the room
@Component({
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Leaving the room</h4>
    </div>
    <div class="modal-body">
      <p>Are you sure you want to leave the room?</p>
    </div>
    <div class="modal-footer row">
      <div class="col">
        <button type="button" class="btn btn-outline-success pull-left" (click)="confirmLeavingRoom( false )">Cancel
        </button>
      </div>
      <div class="col">
        <button type="button" class="btn btn-outline-danger pull-right" (click)="confirmLeavingRoom( true )">Leave</button>
      </div>
    </div>
  `
})
export class LeaveRoomDialogComponent {

  constructor(public activeModal: NgbActiveModal) {
  }

  confirmLeavingRoom(result: boolean) {
    this.activeModal.close(result);
  }
}


// room modal
@Component({
  selector: 'app-room-modal',
  templateUrl: './room-modal.component.html',
  styleUrls: ['./room-modal.component.css']
})
export class RoomModalComponent implements OnInit {

  @Input()
  game: MultiplayerGame;

  @Input()
  user: User;

  @Input()
  currentPlayersNumber: number;

  gameId: number;
  interval: any;

  constructor(private config: NgbModalConfig,
              private modalService: NgbModal,
              public activeModal: NgbActiveModal,
              private dataService: DataService) {
    config.backdrop = 'static';
    config.keyboard = true;
  }

  ngOnInit(): void {
    this.gameId = this.game.id;
    this.loadData();
    this.interval = setInterval(
      () => {
        this.loadData();
        this.redirectToMultiplayerGame();
      }, 2000);
  }

  loadData() {
    this.dataService.getMultiplayerGame(this.gameId)
      .subscribe(
        next => {
          this.game = next;
        }, error1 => {
          console.log(error1.message);
        }
      );
  }

  leave() {
    const modalRef = this.modalService.open(LeaveRoomDialogComponent,
      {
        size: 'sm',
        backdrop: 'static',
        keyboard: true
      }
    );
    modalRef.result.then((result) => {
      if (result) {

        // Deleting room if host leaves
        if (this.game.host.id === this.user.id) {
          this.activeModal.close('deleted');
        } else {
          this.activeModal.close('leave');
        }
      }
    });
  }

  redirectToMultiplayerGame() {
    if (this.currentPlayersNumber === this.game.numberOfPlayers) {
      // TODO: change game status from pending to started
      this.activeModal.close('start');
    }
  }

}
