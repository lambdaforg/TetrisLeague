import { Injectable } from '@angular/core';
import {WebsocketService} from './websocket.service';
import {Observable} from 'rxjs';
import {first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MultiplayerService {

  constructor(private websocketService: WebsocketService) { }

  connect(gameId: number) {
    this.websocketService.connect(gameId);
  }

  sendMessage(gameId: number, message: number) {
    this.websocketService.send(gameId, message);
  }
}

