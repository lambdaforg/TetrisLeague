import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RoomModalComponent} from './room-modal/room-modal.component';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css']
})
export class WaitingRoomComponent implements OnInit {

  selectedNavbar: string;

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.selectedNavbar = 'filter';
  }

  changeNavbar(selectedNavbar: string) {
    this.selectedNavbar = selectedNavbar;
  }

  public createRoom() {
    this.modalService.open(RoomModalComponent, {
      backdrop: 'static'
    });
  }

  public joinRoom() {
    this.modalService.open(RoomModalComponent);
  }

}


