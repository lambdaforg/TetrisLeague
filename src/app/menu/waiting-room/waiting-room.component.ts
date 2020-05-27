import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RoomModalComponent} from './room-modal/room-modal.component';
import {User} from '../../model/User';
import {Router} from '@angular/router';
import {MultiplayerGame} from '../../model/MultiplayerGame';
import {DataService} from '../../data.service';

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

  @Output()
  gameStartedEvent = new EventEmitter();

  constructor(private modalService: NgbModal,
              private router: Router,
              private dataService: DataService) {
  }

  ngOnInit(): void {
    this.selectedNavbar = 'filter';
    this.loadData();
  }

  loadData() {
    this.dataService.getAllPendingMultiplayerGames()
      .subscribe(
      next => {
        console.log(next);
        this.games = next;
      }, error => {
        console.log(error.message);
        }
    );

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


