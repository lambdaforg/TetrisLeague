import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import * as CanvasJS from './../../canvasjs.min';
import {formatDate} from '@angular/common';
import {StatsService} from './classes/stats.service';

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

  initializeCharts() {
    const q = [];

    if (formatDate(this.from, 'yyyy', 'en-UK') === formatDate(this.to, 'yyyy', 'en-UK')) {
      if (formatDate(this.from, 'MM', 'en-UK') === formatDate(this.to, 'MM', 'en-UK')) {
        for (let i = 0; i <= (+formatDate(this.to, 'dd', 'en-UK') - (+formatDate(this.from, 'dd', 'en-UK'))); i++) {
          q[i] = ({
            x: new Date(+formatDate(this.from, 'yyyy', 'en-UK'), +formatDate(this.from, 'MM', 'en-UK') - 1, +formatDate(this.from, 'dd', 'en-UK') + i),
            y: i * Math.random()
          });
          console.log(q[i]);
        }
      } else {
    //       // for (let i = 0; i <= (+formatDate(this.to, 'dd', 'en-UK') - (+formatDate(this.from, 'dd', 'en-UK'))); i++) {
    //       //   q[i] = ({
    //       //     x: new Date(+formatDate(this.from, 'yyyy', 'en-UK'), +formatDate(this.from, 'MM', 'en-UK') - 1 + j, +formatDate(this.from, 'dd', 'en-UK') + i),
    //       //     y: i * Math.random()
    //       //   });
    //       //   console.log(i);
    //       // }
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
