import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import * as SockJS from 'sockjs-client';
import {Stomp, StompSubscription} from '@stomp/stompjs';
import {MultiplayerBoardsComponent} from '../game/multiplayer-boards/multiplayer-boards.component';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnDestroy {

  topic = '/multiplayer/get/';
  signalTopic = '/multiplayer/signal/get/';
  stompClient: any;

  constructor() {

  }

  connect(gameId: number, callback: (msg) => void) {
    const ws = new SockJS(environment.wsUrl);
    this.stompClient = Stomp.over(ws);
    const thisRef = this;
    thisRef.stompClient
      .connect({}, (frame) => {
        thisRef.stompClient.subscribe(thisRef.topic + gameId, callback);
      }, this.errorCallBack);
  }

  signalConnect(gameId: number, callback: (msg) => void) {
    const ws = new SockJS(environment.wsUrl);
    this.stompClient = Stomp.over(ws);
    const thisRef = this;
    thisRef.stompClient
      .connect({}, (frame) => {
        thisRef.stompClient.subscribe(thisRef.signalTopic + gameId, callback);
      }, this.errorCallBack);
  }

  ngOnDestroy() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
  }

  errorCallBack(error) {
    console.log('errorCallBack: ' + error);
  }

  send(gameId: number, message) {
    this.stompClient.send('/app/send/' + gameId, {}, JSON.stringify(message));
  }

  sendSignal(gameId: number, userId: number) {
    this.stompClient.send('/app/sendSignal/' + gameId, {}, JSON.stringify(userId));
  }
}
