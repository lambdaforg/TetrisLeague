import {Injectable, OnDestroy} from '@angular/core';
import {environment} from '../../environments/environment';
import * as SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnDestroy {

  client: any;
  topic = '/multiplayer/get/';
  stompClient: any;

  connect(gameId: number) {
    const ws = new SockJS(environment.wsUrl);
    this.stompClient = Stomp.over(ws);
    const thisRef = this;
    thisRef.stompClient.connect({}, (frame) => {
      thisRef.stompClient.subscribe(
        thisRef.topic + gameId, (sdkEvent) => {
          thisRef.onMessageReceived(sdkEvent);
        });
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

  send(gameId: number, score: number) {
    this.stompClient.send('/app/send/' + gameId, {}, JSON.stringify(score));
  }

  onMessageReceived(score) {
    console.log('message received: ' + score);
  }
}
