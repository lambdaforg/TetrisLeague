import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RoomModalComponent} from './room-modal/room-modal.component';
import {User} from '../../model/User';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css']
})
export class WaitingRoomComponent implements OnInit {

  @Input()
  user: User;

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
    console.log(this.user);
    const modalRef = this.modalService.open(RoomModalComponent, {
      backdrop: 'static'
    });

    modalRef.componentInstance.user = this.user;
  }

  public joinRoom() {
    this.modalService.open(RoomModalComponent);
  }

}


