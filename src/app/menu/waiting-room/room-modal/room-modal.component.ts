import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';


// dialog shown when player wants to leave the room
@Component({
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Leaving the room</h4>
    </div>
    <div class="modal-body">
      <p>Are you sure you want to leave the room?</p>
    </div>
    <div class="modal-footer btn-group">
      <button type="button" class="btn btn-outline-success" style="margin-right: 100px" (click)="confirmLeavingRoom( false )">Cancel
      </button>
      <button type="button" class="btn btn-outline-danger" (click)="confirmLeavingRoom( true )">Leave</button>
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

  constructor(config: NgbModalConfig, private modalService: NgbModal, public activeModal: NgbActiveModal) {
    config.backdrop = 'static';
    config.keyboard = true;
  }

  ngOnInit(): void {
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
        this.activeModal.close();
      }
    });
  }
}
