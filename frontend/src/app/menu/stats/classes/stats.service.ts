import {EventEmitter, Injectable} from '@angular/core';
import {formatDate} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  favouriteStatsEventEmitter = new EventEmitter<string>();

  constructor() {
  }

  giveMonth(numMonth: number) {
    let month: string;
    switch (numMonth) {
      case 1:
        month = 'Jan';
        return month;
        break;
      case 2:
        month = 'Feb';
        return month;
        break;
      case 3:
        month = 'Mar';
        return month;
        break;
      case 4:
        month = 'Apr';
        return month;
        break;
      case 5:
        month = 'May';
        return month;
        break;
      case 6:
        month = 'Jun';
        return month;
        break;
      case 7:
        month = 'Jul';
        return month;
        break;
      case 8:
        month = 'Aug';
        return month;
        break;
      case 9:
        month = 'Sep';
        return month;
        break;
      case 10:
        month = 'Oct';
        return month;
        break;
      case 11:
        month = 'Nov';
        return month;
        break;
      case 12:
        month = 'Dec';
        return month;
        break;
    }

  }

  giveNextMonth(month: number, monthsAhead: number) {
    const date = new Date(2020, month + monthsAhead - 1, 1);
    return formatDate(date, 'MMM', 'en-UK');
  }

}
