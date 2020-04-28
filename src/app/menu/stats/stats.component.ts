import {Component, Input, OnInit} from '@angular/core';
import * as CanvasJS from './../../canvasjs.min';
import {formatDate} from '@angular/common';
import {StatsService} from './classes/stats.service';
import {MONTHS} from './classes/constants';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  selectedBookmark: string;
  @Input()
  favourite: string;
  role: string;
  from: string;
  to: string;


  constructor(private service: StatsService) {
  }

  ngOnInit(): void {
    this.selectedBookmark = this.favourite;
    this.from = formatDate(new Date(2020, 3, 10), 'yyyy MM dd', 'en-UK');
    this.to = formatDate(new Date(), 'yyyy MM dd', 'en-UK');

    this.initializeCharts();
  }

  changeBookmark(bookmark: string) {
    this.selectedBookmark = bookmark;
    this.initializeCharts();
  }

  setFavoutite() {
    this.service.favouriteStatsEventEmitter.emit(this.selectedBookmark);
  }

  computeMonthsScope(from: string, to: string): Array<{ Date, number }> {
    let q = [];
    let febDays: number;
    const startYear = +formatDate(from, 'yyyy', 'en-UK');
    const endYear = +formatDate(to, 'yyyy', 'en-UK');
    let wholeMonthsNumber = 0;
    let scope = 0;
    let month: string;
    let previousScope = 0;

    if (formatDate(this.from, 'MMM', 'en-UK') === formatDate(this.to, 'MMM', 'en-UK') &&
      formatDate(this.from, 'dd', 'en-UK') < formatDate(this.to, 'dd', 'en-UK')) {
      scope += +formatDate(to, 'dd', 'en-UK') - (+formatDate(from, 'dd', 'en-UK'));
      for (let i = 0; i <= scope; i++) {
        q[i] = ({
          x: new Date(+formatDate(from, 'yyyy', 'en-UK'), +formatDate(from, 'MM', 'en-UK') - 1, +formatDate(from, 'dd', 'en-UK') + i),
          y: 100 * i * Math.round(Math.random())
        });
      }
      return q;
    }
    if ((((startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0) &&
      (formatDate(from, 'MMM', 'en-UK') === 'Jan' ||
      formatDate(from, 'MMM', 'en-UK') === 'Feb')) ||
      (((endYear % 4 === 0 && endYear % 100 !== 0) || endYear % 400 === 0) &&
        (formatDate(from, 'MMM', 'en-UK') !== 'Jan' ||
        formatDate(from, 'MMM', 'en-UK') !== 'Feb'))){
      febDays = 29;
    } else {
      febDays = 28;
    }

    month = this.service.giveMonth(+formatDate(from, 'MM', 'en-UK'));
    if (formatDate(from, 'MMM', 'en-UK') === 'Feb') {
      scope += febDays - (+formatDate(from, 'dd', 'en-UK'));
    } else {
      scope += MONTHS[month] - (+formatDate(from, 'dd', 'en-UK'));
    }

    for (let i = 0; i <= scope; i++) {

      q[i] = ({
        x: new Date(+formatDate(from, 'yyyy', 'en-UK'), +formatDate(from, 'MM', 'en-UK') - 1, +formatDate(from, 'dd', 'en-UK') + i),
        y: 100 * i * Math.round(Math.random())
      });

    }
    previousScope = scope;

    if (formatDate(from, 'yyyy', 'en-UK') !== formatDate(to, 'yyyy', 'en-UK')) {
      let date = new Date(+formatDate(from, 'yyyy', 'en-UK'), +formatDate(from, 'MM', 'en-UK') - 1, +formatDate(from, 'dd', 'en-UK'));

      do {
        wholeMonthsNumber++;
        date = new Date(+formatDate(from, 'yyyy', 'en-UK'), +formatDate(from, 'MM', 'en-UK') + wholeMonthsNumber, +formatDate(from, 'dd', 'en-UK'));
      } while (formatDate(date, 'MMM', 'en-UK') !== formatDate(to, 'MMM', 'en-UK'));
    } else {
      for (let i = 1; i < (+formatDate(to, 'MM', 'en-UK') - (+formatDate(from, 'MM', 'en-UK'))); i++) {
        wholeMonthsNumber++;
      }
    }

    for (const i in MONTHS) {
      if (i === month) {
        for (let j = 1; j <= wholeMonthsNumber; j++) {
          const nextMonth = this.service.giveNextMonth(+formatDate(from, 'MM', 'en-UK'), j);
          if (nextMonth === 'Feb') {
            scope += febDays;
          } else {
            scope += MONTHS[nextMonth];
          }

          for (let i = previousScope; i <= scope; i++) {
            q[i] = ({
              x: new Date(+formatDate(from, 'yyyy', 'en-UK'), +formatDate(from, 'MM', 'en-UK') - 1, +formatDate(from, 'dd', 'en-UK') + i),
              y: 100 * i * Math.round(Math.random())
            });
          }

          previousScope = scope;

        }
      }
    }
    scope += +formatDate(to, 'dd', 'en-UK');

    for (let i = previousScope + 1; i <= scope; i++) {
      q[i] = ({
        x: new Date(+formatDate(from, 'yyyy', 'en-UK'), +formatDate(from, 'MM', 'en-UK') - 1, +formatDate(from, 'dd', 'en-UK') + i),
        y: 100 * i * Math.round(Math.random())
      });
    }
    return q;
  }

  initializeCharts() {
    let q = [];
    let year = +formatDate(this.from, 'yyyy', 'en-UK');
    let scope = 0;
    let previousScope = 0;
    let yearDays: number;


    if (formatDate(this.from, 'yyyy', 'en-UK') === formatDate(this.to, 'yyyy', 'en-UK')) {
      if (formatDate(this.from, 'MM', 'en-UK') === formatDate(this.to, 'MM', 'en-UK')) {
        for (let i = 0; i <= (+formatDate(this.to, 'dd', 'en-UK') - (+formatDate(this.from, 'dd', 'en-UK'))); i++) {
          q[i] = ({
            x: new Date(+formatDate(this.from, 'yyyy', 'en-UK'), +formatDate(this.from, 'MM', 'en-UK') - 1, +formatDate(this.from, 'dd', 'en-UK') + i),
            y: 100 * i * Math.round(Math.random())
          });
        }
      } else {
        q = this.computeMonthsScope(this.from, this.to);
      }
    } else {
      if ((+formatDate(this.to, 'yyyy', 'en-UK') - (+formatDate(this.from, 'yyyy', 'en-UK')) >= 2) ||
        formatDate(this.to, 'MM', 'en-UK') > formatDate(this.from, 'MM', 'en-UK') ||
        (formatDate(this.to, 'MM', 'en-UK') === formatDate(this.from, 'MM', 'en-UK') &&
          (formatDate(this.to, 'dd', 'en-UK') >= formatDate(this.from, 'dd', 'en-UK')))) {

        let yearScope = +formatDate(this.to, 'yyyy', 'en-UK') - (+formatDate(this.from, 'yyyy', 'en-UK'));
        if (+formatDate(this.to, 'MM','en-UK') < +formatDate(this.from, 'MM','en-UK') ||
          (+formatDate(this.to, 'MM','en-UK') === +formatDate(this.from, 'MM','en-UK') &&
            +formatDate(this.to, 'dd','en-UK') < +formatDate(this.from, 'dd','en-UK'))){

          yearScope--;

        }
        for (let i = 0; i < yearScope; i++) {
          year = +formatDate(this.from, 'yyyy', 'en-UK') + i;
          if (((year % 4 === 0 && year % 100 !== 0) ||
            year % 400 === 0) &&
            formatDate(this.from, 'MMM', 'en-UK') === 'Jan' &&
            formatDate(this.from, 'MMM', 'en-UK') === 'Feb') {
            yearDays = 366;
          } else {
            yearDays = 365;
          }
          scope += yearDays;
        }
        for (let i = 0; i <= scope; i++) {
          q[i] = ({
            x: new Date(+formatDate(this.from, 'yyyy', 'en-UK'), +formatDate(this.from, 'MM', 'en-UK') - 1, +formatDate(this.from, 'dd', 'en-UK') + i),
            y: 100 * i * Math.round(Math.random())
          });
        }
        if (formatDate(this.to, 'dd', 'en-UK') !== formatDate(this.from, 'dd', 'en-UK')){
          let q2 = this.computeMonthsScope(formatDate(new Date(+formatDate(this.from, 'yyyy', 'en-UK'),
            +formatDate(this.from, 'MM', 'en-UK') - 1,
            +formatDate(this.from, 'dd', 'en-UK') + scope), 'yyyy MM dd', 'en-UK'), this.to);
          q = q.concat(q2);
        }
      } else {
        q = this.computeMonthsScope(this.from, this.to);
      }
    }

    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      theme: 'light2',
      title: {
        text: 'User scores'
      },
      axisX: {
        title: 'Date of attainment',
        valueFormatString: 'DD MMM, YYYY',
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: 'Score',
        crosshair: {
          enabled: true
        }
      },
      data: [{
        type: 'line',
        dataPoints: q
      }]
    });


    const chart2 = new CanvasJS.Chart('chartContainer2', {
      animationEnabled: true,
      theme: 'light2',
      title: {
        text: 'User Ranking Points'
      },
      axisX: {
        title: 'Date of attainment',
        valueFormatString: 'DD MMM, YYYY',
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: 'Capital (in RP)',
        valueFormatString: 'RP#0',
        crosshair: {
          enabled: true
        }
      },
      data: [{
        type: 'line',
        dataPoints: q
      }]
    });

    chart.render();
    chart2.render();

  }

  searchInterval() {
    this.initializeCharts();
  }

}
