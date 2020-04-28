import { Component, OnInit } from '@angular/core';
// import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css']
})
export class WaitingRoomComponent implements OnInit {

  selectedNavbar: string;

  constructor() { }

  ngOnInit(): void {
    this.selectedNavbar = 'filter';
  }

  changeNavbar(selectedNavbar: string) {
    this.selectedNavbar = selectedNavbar;
  }

  openCreatedRoom(createdRoomModal) {
    // this.modalService.open(createdRoomModal);
  }

}
