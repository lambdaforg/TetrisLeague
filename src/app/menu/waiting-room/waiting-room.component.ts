import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RoomModalComponent} from './room-modal/room-modal.component';
import {User} from '../../model/User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css']
})
export class WaitingRoomComponent implements OnInit {

  @Input()
  user: User;

  selectedNavbar: string;

  @Output()
  gameStartedEvent = new EventEmitter();

  constructor(private modalService: NgbModal,
              private router: Router) {
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
    modalRef.result.then(
      (result) => {
        if (result === 'start') {
          this.gameStartedEvent.emit();
        }
      });
  }

  public joinRoom() {
    const modalRef = this.modalService.open(RoomModalComponent);
    modalRef.componentInstance.user = this.user;
  }

}


