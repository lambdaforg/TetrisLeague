import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  favouriteStatsEventEmitter = new EventEmitter<string>();

  constructor() { }
}
