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
  validDates = true;
  earlierDatesThanPresent = true;
  exitButton = false;
  all = true;
  chartId: number;
  private heights = [400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400];
  private widths = [600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600];

  constructor(private service: StatsService) {
  }

  ngOnInit(): void {
    this.chartId = -1;

    this.selectedBookmark = this.favourite;
    this.from = formatDate(new Date(2020, 3, 10), 'yyyy MM dd', 'en-UK');
    this.to = formatDate(new Date(), 'yyyy MM dd', 'en-UK');

    this.initializeCharts();
    this.role = 'admin';
    if (this.role === 'user'){
      this.selectedBookmark = 'User';
    }
  }

  changeBookmark(bookmark: string) {
    if (!this.validDates || !this.earlierDatesThanPresent || this.from === '' || this.to === '') {
      return;
    }
    this.selectedBookmark = bookmark;
    this.initializeCharts();
  }

  setFavoutite() {
    this.service.favouriteStatsEventEmitter.emit(this.selectedBookmark);
  }

  checkIfDatesAreValid() {
    const dateParts1 = this.from.split(' ');
    const dateParts2 = this.to.split(' ');
    const month1 = this.service.giveMonth(+dateParts1[1]);
    const month2 = this.service.giveMonth(+dateParts2[1]);
    const presentDate = new Date();
    const presentYear = +formatDate(presentDate, 'yyyy', 'en-UK');
    const presentMonth = +formatDate(presentDate, 'MM', 'en-UK');
    const presentDay = +formatDate(presentDate, 'dd', 'en-UK');

    if (+dateParts1[0] > presentYear || +dateParts2[0] > presentYear) {

      this.earlierDatesThanPresent = false;

    } else if ((+dateParts1[1] > presentMonth && +dateParts1[0] === presentYear) || (+dateParts2[1] > presentMonth && +dateParts2[0] === presentYear)) {

      this.earlierDatesThanPresent = false;

    } else if ((+dateParts1[2] > presentDay && +dateParts1[1] === presentMonth) || (+dateParts2[2] > presentDay && +dateParts2[1] === presentMonth)) {

      this.earlierDatesThanPresent = false;

    } else {
      this.earlierDatesThanPresent = true;
    }
    if (+dateParts1[0] > +dateParts2[0]) {

      this.validDates = false;

    } else if (+dateParts1[1] > 12 || +dateParts1[1] < 1 || +dateParts2[1] > 12 || +dateParts2[1] < 1) {

      this.validDates = false;

    } else if (+dateParts1[1] > +dateParts2[1] && +dateParts1[0] === +dateParts2[0]) {

      this.validDates = false;

    } else if (+dateParts1[2] > MONTHS[month1] || +dateParts2[2] > MONTHS[month2] || +dateParts1[2] < 1 || +dateParts2[2] < 1) {

      this.validDates = false;

    } else if (+dateParts1[2] > +dateParts2[2] && +dateParts1[1] === +dateParts2[1] && +dateParts1[0] === +dateParts2[0]) {

      this.validDates = false;

    } else {

      this.validDates = true;

    }
  }

  decreaseChart() {
    this.all = true;
    this.exitButton = false;
    this.heights[this.chartId] = 400;
    this.widths[this.chartId] = 600;
    this.initializeCharts();
  }


  expandChart(chartId: number) {
    this.all = false;
    this.exitButton = true;
    switch (chartId) {
      case 0:
        this.chartId = 0;
        break;
      case 1:
        this.chartId = 1;
        break;
      case 2:
        this.chartId = 2;
        break;
      case 3:
        this.chartId = 3;
        break;
      case 4:
        this.chartId = 4;
        break;
      case 5:
        this.chartId = 5;
        break;
      case 6:
        this.chartId = 6;
        break;
      case 7:
        this.chartId = 7;
        break;
      case 8:
        this.chartId = 8;
        break;
      case 9:
        this.chartId = 9;
        break;
      case 10:
        this.chartId = 10;
        break;
    }

    this.heights[this.chartId] = 700;
    this.widths[this.chartId] = 1300;
    this.initializeCharts();

  }

  computeMonthsScope(from: string, to: string, type: string): Array<{ Date, number }> {
    const q = [];
    let febDays: number;
    const startYear = +formatDate(from, 'yyyy', 'en-UK');
    const endYear = +formatDate(to, 'yyyy', 'en-UK');
    let wholeMonthsNumber = 0;
    let scope = 0;
    let month: string;
    let previousScope = 0;
    let yValue: number;
    let indexLabel: string;
    let markerColor: string;
    let markerType: string;
    let difference: number;

    if (formatDate(this.from, 'MMM', 'en-UK') === formatDate(this.to, 'MMM', 'en-UK') &&
      formatDate(this.from, 'dd', 'en-UK') < formatDate(this.to, 'dd', 'en-UK')) {
      scope += +formatDate(to, 'dd', 'en-UK') - (+formatDate(from, 'dd', 'en-UK'));
      for (let i = 0; i <= scope; i++) {
        if (type === 'financial') {
          yValue = 100 * i * Math.round(Math.random());
          if (i === 0) {
            difference = yValue;
          } else {
            difference = yValue - q[i - 1].y;
          }
          if (difference > 0) {
            indexLabel = `+${difference}`;
            markerColor = 'green';
            markerType = 'triangle';
          } else {
            indexLabel = `${difference}`;
            markerColor = 'red';
            markerType = 'triangle';
          }
          q[i] = ({
            x: new Date(+formatDate(this.from, 'yyyy', 'en-UK'), +formatDate(this.from, 'MM', 'en-UK') - 1, +formatDate(this.from, 'dd', 'en-UK') + i),
            y: yValue,
            indexLabel: indexLabel, markerColor: markerColor, markerType: markerType
          });

        } else {
          q[i] = ({
            x: new Date(+formatDate(from, 'yyyy', 'en-UK'), +formatDate(from, 'MM', 'en-UK') - 1, +formatDate(from, 'dd', 'en-UK') + i),
            y: 100 * i * Math.round(Math.random())
          });

        }
      }
      return q;
    }
    if ((((startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0) &&
      (formatDate(from, 'MMM', 'en-UK') === 'Jan' ||
        formatDate(from, 'MMM', 'en-UK') === 'Feb')) ||
      (((endYear % 4 === 0 && endYear % 100 !== 0) || endYear % 400 === 0) &&
        (formatDate(from, 'MMM', 'en-UK') !== 'Jan' ||
          formatDate(from, 'MMM', 'en-UK') !== 'Feb'))) {
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
      if (type === 'financial') {
        yValue = 100 * i * Math.round(Math.random());
        if (i === 0) {
          difference = yValue;
        } else {
          difference = yValue - q[i - 1].y;
        }
        if (difference > 0) {
          indexLabel = `+${difference}`;
          markerColor = 'green';
          markerType = 'triangle';
        } else {
          indexLabel = `${difference}`;
          markerColor = 'red';
          markerType = 'triangle';
        }
        q[i] = ({
          x: new Date(+formatDate(this.from, 'yyyy', 'en-UK'), +formatDate(this.from, 'MM', 'en-UK') - 1, +formatDate(this.from, 'dd', 'en-UK') + i),
          y: yValue,
          indexLabel: indexLabel, markerColor: markerColor, markerType: markerType
        });

      } else {
        q[i] = ({
          x: new Date(+formatDate(from, 'yyyy', 'en-UK'), +formatDate(from, 'MM', 'en-UK') - 1, +formatDate(from, 'dd', 'en-UK') + i),
          y: 100 * i * Math.round(Math.random())
        });
      }

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
            if (type === 'financial') {
              yValue = 100 * i * Math.round(Math.random());
              if (i === 0) {
                difference = yValue;
              } else {
                difference = yValue - q[i - 1].y;
              }
              if (difference > 0) {
                indexLabel = `+${difference}`;
                markerColor = 'green';
                markerType = 'triangle';
              } else {
                indexLabel = `${difference}`;
                markerColor = 'red';
                markerType = 'triangle';
              }
              q[i] = ({
                x: new Date(+formatDate(this.from, 'yyyy', 'en-UK'), +formatDate(this.from, 'MM', 'en-UK') - 1, +formatDate(this.from, 'dd', 'en-UK') + i),
                y: yValue,
                indexLabel: indexLabel, markerColor: markerColor, markerType: markerType
              });

            } else {
              q[i] = ({
                x: new Date(+formatDate(from, 'yyyy', 'en-UK'), +formatDate(from, 'MM', 'en-UK') - 1, +formatDate(from, 'dd', 'en-UK') + i),
                y: 100 * i * Math.round(Math.random())
              });
            }
          }

          previousScope = scope;

        }
      }
    }
    scope += +formatDate(to, 'dd', 'en-UK');

    for (let i = previousScope + 1; i <= scope; i++) {
      if (type === 'financial') {
        yValue = 100 * i * Math.round(Math.random());
        if (i === 0) {
          difference = yValue;
        } else {
          difference = yValue - q[i - 1].y;
        }
        if (difference > 0) {
          indexLabel = `+${difference}`;
          markerColor = 'green';
          markerType = 'triangle';
        } else {
          indexLabel = `${difference}`;
          markerColor = 'red';
          markerType = 'triangle';
        }
        q[i] = ({
          x: new Date(+formatDate(this.from, 'yyyy', 'en-UK'), +formatDate(this.from, 'MM', 'en-UK') - 1, +formatDate(this.from, 'dd', 'en-UK') + i),
          y: yValue,
          indexLabel: indexLabel, markerColor: markerColor, markerType: markerType
        });

      } else {
        q[i] = ({
          x: new Date(+formatDate(from, 'yyyy', 'en-UK'), +formatDate(from, 'MM', 'en-UK') - 1, +formatDate(from, 'dd', 'en-UK') + i),
          y: 100 * i * Math.round(Math.random())
        });
      }
    }
    return q;
  }

  initializeCharts() {
    let q = [];
    let q2 = [];
    let year = +formatDate(this.from, 'yyyy', 'en-UK');
    let scope = 0;
    const previousScope = 0;
    let yearDays: number;
    let yValue: number;
    let indexLabel: string;
    let markerColor: string;
    let markerType: string;
    let difference: number;
    let type: string;

    if (formatDate(this.from, 'yyyy', 'en-UK') === formatDate(this.to, 'yyyy', 'en-UK')) {
      if (formatDate(this.from, 'MM', 'en-UK') === formatDate(this.to, 'MM', 'en-UK')) {
        for (let i = 0; i <= (+formatDate(this.to, 'dd', 'en-UK') - (+formatDate(this.from, 'dd', 'en-UK'))); i++) {
          q[i] = ({
            x: new Date(+formatDate(this.from, 'yyyy', 'en-UK'), +formatDate(this.from, 'MM', 'en-UK') - 1, +formatDate(this.from, 'dd', 'en-UK') + i),
            y: 100 * i * Math.round(Math.random())
          });
          yValue = 100 * i * Math.round(Math.random());
          if (i === 0) {
            difference = yValue;
          } else {
            difference = yValue - q2[i - 1].y;
          }
          if (difference > 0) {
            indexLabel = `+${difference}`;
            markerColor = 'green';
            markerType = 'triangle';
          } else {
            indexLabel = `${difference}`;
            markerColor = 'red';
            markerType = 'triangle';
          }
          q2[i] = ({
            x: new Date(+formatDate(this.from, 'yyyy', 'en-UK'), +formatDate(this.from, 'MM', 'en-UK') - 1, +formatDate(this.from, 'dd', 'en-UK') + i),
            y: yValue,
            indexLabel: indexLabel, markerColor: markerColor, markerType: markerType
          });

        }
      } else {
        type = 'simple';
        q = this.computeMonthsScope(this.from, this.to, type);
        type = 'financial';
        q2 = this.computeMonthsScope(this.from, this.to, type);
      }
    } else {
      if ((+formatDate(this.to, 'yyyy', 'en-UK') - (+formatDate(this.from, 'yyyy', 'en-UK')) >= 2) ||
        formatDate(this.to, 'MM', 'en-UK') > formatDate(this.from, 'MM', 'en-UK') ||
        (formatDate(this.to, 'MM', 'en-UK') === formatDate(this.from, 'MM', 'en-UK') &&
          (formatDate(this.to, 'dd', 'en-UK') >= formatDate(this.from, 'dd', 'en-UK')))) {

        let yearScope = +formatDate(this.to, 'yyyy', 'en-UK') - (+formatDate(this.from, 'yyyy', 'en-UK'));
        if (+formatDate(this.to, 'MM', 'en-UK') < +formatDate(this.from, 'MM', 'en-UK') ||
          (+formatDate(this.to, 'MM', 'en-UK') === +formatDate(this.from, 'MM', 'en-UK') &&
            +formatDate(this.to, 'dd', 'en-UK') < +formatDate(this.from, 'dd', 'en-UK'))) {

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
          yValue = 100 * i * Math.round(Math.random());
          if (i === 0) {
            difference = yValue;
          } else {
            difference = yValue - q2[i - 1].y;
          }
          if (difference > 0) {
            indexLabel = `+${difference}`;
            markerColor = 'green';
            markerType = 'triangle';
          } else {
            indexLabel = `${difference}`;
            markerColor = 'red';
            markerType = 'triangle';
          }
          q2[i] = ({
            x: new Date(+formatDate(this.from, 'yyyy', 'en-UK'), +formatDate(this.from, 'MM', 'en-UK') - 1, +formatDate(this.from, 'dd', 'en-UK') + i),
            y: yValue,
            indexLabel: indexLabel, markerColor: markerColor, markerType: markerType
          });

        }
        if (formatDate(this.to, 'dd', 'en-UK') !== formatDate(this.from, 'dd', 'en-UK')) {
          type = 'simple';
          const qd = this.computeMonthsScope(formatDate(new Date(+formatDate(this.from, 'yyyy', 'en-UK'),
            +formatDate(this.from, 'MM', 'en-UK') - 1,
            +formatDate(this.from, 'dd', 'en-UK') + scope), 'yyyy MM dd', 'en-UK'), this.to, type);
          q = q.concat(qd);
          type = 'financial';
          const qd2 = this.computeMonthsScope(formatDate(new Date(+formatDate(this.from, 'yyyy', 'en-UK'),
            +formatDate(this.from, 'MM', 'en-UK') - 1,
            +formatDate(this.from, 'dd', 'en-UK') + scope), 'yyyy MM dd', 'en-UK'), this.to, type);
          q2 = q2.concat(qd2);
        }
      } else {
        type = 'simple';
        q = this.computeMonthsScope(this.from, this.to, type);
        type = 'financial';
        q2 = this.computeMonthsScope(this.from, this.to, type);
      }
    }


    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      height: this.heights[0],
      width: this.widths[0],
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

    chart.render();

    const chart2 = new CanvasJS.Chart('chartContainer2', {
      animationEnabled: true,
      height: this.heights[1],
      width: this.widths[1],
      theme: 'light2',
      title: {
        text: 'All User Ranking Points'
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
        indexLabelFontSize: 8,
        type: 'line',
        dataPoints: q2
      }]
    });

    chart2.render();

    const chart3 = new CanvasJS.Chart('chartContainer3', {
      animationEnabled: true,
      height: this.heights[2],
      width: this.widths[2],
      theme: 'light2',
      title: {
        text: 'Challenge User Ranking Points'
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
        indexLabelFontSize: 8,
        type: 'line',
        dataPoints: q2
      }]
    });

    chart3.render();

    if (this.role === 'user'){
      return;
    }

    let q3 = q;
    let q4 = q;
    let q5 = q;

    for (let i = 0; i < q.length; i++) {
      q3[i].y += Math.round(Math.random() + 50);
      q4[i].y += Math.round(Math.random() + 150);
      q5[i].y += Math.round(Math.random() + 300);
    }

    const chart4 = new CanvasJS.Chart("chartContainer4", {
      animationEnabled: true,
      height: this.heights[3],
      width: this.widths[3],
      theme: 'light2',
      title: {
        text: "Amount of players vs guests"
      },
      axisX: {
        title: 'Date',
        valueFormatString: "DD MMM,YYYY"
      },
      axisY: {
        title: "Amount of users"
      },
      legend: {
        verticalAlign: "top",
        horizontalAlign: "center",
        dockInsidePlotArea: true,
      },
      toolTip: {
        shared: true
      },
      data: [{
        name: "Players",
        type: "spline",
        showInLegend: true,
        dataPoints: q3
      },
        {
          name: "Guests reading info",
          type: "spline",
          showInLegend: true,
          dataPoints: q4
        },
        {
          name: "Guests not reading info",
          type: "spline",
          showInLegend: true,
          dataPoints: q5
        }]
    });
    chart4.render();


    const chart5 = new CanvasJS.Chart("chartContainer5", {
      animationEnabled: true,
      height: this.heights[4],
      width: this.widths[4],
      theme: 'light2',
      title: {
        text: "Incidence of logon"
      },
      data: [{
        type: "pie",
        startAngle: 270,
        yValueFormatString: "##0.00\"%\"",
        indexLabel: "{label} {y}",
        dataPoints: [
          {y: 79.45, label: "every day"},
          {y: 7.31, label: "five times a week"},
          {y: 7.06, label: "three time a week"},
          {y: 4.91, label: "once a week"},
          {y: 1.26, label: "twice a day"}
        ]
      }]
    });
    chart5.render();

    const chart6 = new CanvasJS.Chart("chartContainer6", {
      animationEnabled: true,
      height: this.heights[5],
      width: this.widths[5],
      theme: 'light2',
      title: {
        text: "Amount of logged players"
      },
      axisX: {
        title: 'Date',
        valueFormatString: "DD MMM,YYYY"
      },
      axisY: {
        title: "Amount of players",
      },
      toolTip: {
        shared: true,
      },
      legend: {
        verticalAlign: "top",
        horizontalAlign: "center",
        dockInsidePlotArea: false,
      },
      data: [{
        type: "rangeSplineArea",
        markerSize: 0,
        name: "min and max amount of logged players",
        showInLegend: true,
        toolTipContent: "{x}<br><span style=\"color:#6D77AC\">Amount of logged players: </span><br>Min: {y[1]}<br>Max: {y[0]}",
        dataPoints: [
          {x: new Date(2017, 6, 1), y: [30, 19]},
          {x: new Date(2017, 6, 2), y: [30, 21]},
          {x: new Date(2017, 6, 3), y: [29, 21]},
          {x: new Date(2017, 6, 4), y: [28, 20]},
          {x: new Date(2017, 6, 5), y: [29, 20]},
          {x: new Date(2017, 6, 6), y: [29, 20]},
          {x: new Date(2017, 6, 7), y: [27, 21]},
          {x: new Date(2017, 6, 8), y: [26, 20]},
          {x: new Date(2017, 6, 9), y: [30, 20]},
          {x: new Date(2017, 6, 10), y: [30, 21]},
          {x: new Date(2017, 6, 11), y: [30, 21]},
          {x: new Date(2017, 6, 12), y: [29, 21]},
          {x: new Date(2017, 6, 13), y: [27, 20]},
          {x: new Date(2017, 6, 14), y: [27, 20]},
          {x: new Date(2017, 6, 15), y: [25, 20]},
          {x: new Date(2017, 6, 16), y: [29, 20]},
          {x: new Date(2017, 6, 17), y: [28, 20]},
          {x: new Date(2017, 6, 18), y: [27, 21]},
          {x: new Date(2017, 6, 19), y: [27, 21]},
          {x: new Date(2017, 6, 20), y: [29, 21]},
          {x: new Date(2017, 6, 21), y: [29, 20]},
          {x: new Date(2017, 6, 22), y: [31, 20]},
          {x: new Date(2017, 6, 23), y: [30, 21]},
          {x: new Date(2017, 6, 24), y: [30, 20]},
          {x: new Date(2017, 6, 25), y: [31, 21]},
          {x: new Date(2017, 6, 26), y: [30, 21]},
          {x: new Date(2017, 6, 27), y: [31, 21]},
          {x: new Date(2017, 6, 28), y: [31, 21]},
          {x: new Date(2017, 6, 29), y: [31, 21]},
          {x: new Date(2017, 6, 30), y: [31, 21]},
          {x: new Date(2017, 6, 31), y: [31, 22]}
        ]
      }]
    });
    chart6.render();

    addAverages();

    function addAverages() {
      let dps = [];
      for (let i = 0; i < chart6.options.data[0].dataPoints.length; i++) {
        dps.push({
          x: chart6.options.data[0].dataPoints[i].x,
          y: (chart6.options.data[0].dataPoints[i].y[0] + chart6.options.data[0].dataPoints[i].y[1]) / 2
        });
      }
      chart6.options.data.push({
        type: "spline",
        name: "Average",
        showInLegend: true,
        markerType: "triangle",
        markerSize: 0,
        yValueFormatString: "##.",
        dataPoints: dps
      });
      chart6.render();
    }

    const chart7 = new CanvasJS.Chart("chartContainer7", {
      animationEnabled: true,
      height: this.heights[6],
      width: this.widths[6],
      theme: 'light2',
      title: {
        text: "Parts of a day of biggest website traffic"
      },
      data: [{
        type: "pie",
        startAngle: 270,
        yValueFormatString: "##0.00\"%\"",
        indexLabel: "{label} {y}",
        dataPoints: [
          {y: 1.00, label: "6AM - 8AM"},
          {y: 3.31, label: "8AM - 10AM"},
          {y: 3.86, label: "10AM - 12AM"},
          {y: 2.45, label: "12AM - 2PM"},
          {y: 1.50, label: "2PM - 4PM"},
          {y: 8.30, label: "4PM - 6PM"},
          {y: 30.40, label: "6PM - 8PM"},
          {y: 25.62, label: "8PM - 10PM"},
          {y: 9.90, label: "10PM - 12PM"},
          {y: 7.88, label: "12PM - 2AM"},
          {y: 4.52, label: "2AM - 4AM"},
          {y: 1.26, label: "4AM - 6AM"}
        ]
      }]
    });
    chart7.render();

    for (let i of q) {
      i.y = Math.floor(Math.random() * (100 + 1));
    }

    const chart8 = new CanvasJS.Chart("chartContainer8", {
      animationEnabled: true,
      height: this.heights[7],
      width: this.widths[7],
      theme: 'light2',
      title: {
        text: "Customer Satisfaction Based on Reviews"
      },
      axisY: {
        title: "Satisfied Customers",
        suffix: "%",
        maxValue: 100
      },
      data: [{
        type: "stepArea",
        markerSize: 5,
        xValueFormatString: "DD MMMM YYYY",
        yValueFormatString: "#,##0.##\"%\"",
        dataPoints: q
      }]
    });
    chart8.render();

    let chart9 = new CanvasJS.Chart("chartContainer9", {
      animationEnabled: true,
      height: this.heights[8],
      width: this.widths[8],
      theme: 'light2',
      title: {
        text: "Quantity of invitations by effect"
      },
      axisX: {
        valueFormatString: "DD MMM YYYY"
      },
      axisY: {
        title: "Quantity of invitations",
      },
      toolTip: {
        shared: true
      },
      legend: {
        verticalAlign: "top",
        horizontalAlign: "center",
        dockInsidePlotArea: true,
      },
      data: [{
        type: "line",
        name: "All",
        showInLegend: true,
        markerSize: 0,
        dataPoints: q5
      },
        {
          type: "line",
          name: "Accepted",
          showInLegend: true,
          markerSize: 0,
          dataPoints: q
        },
        {
          type: "line",
          name: "Denied",
          showInLegend: true,
          markerSize: 0,
          dataPoints: q
        }]
    });
    chart9.render();

    let chart10 = new CanvasJS.Chart("chartContainer10", {
      animationEnabled: true,
      height: this.heights[9],
      width: this.widths[9],
      theme: 'light2',
      title: {
        text: "Quantity of Singleplayer and Multiplayer games"
      },
      axisX: {
        valueFormatString: "DD MMM YYYY"
      },
      axisY: {
        title: "Quantity of games",
      },
      toolTip: {
        shared: true
      },
      legend: {
        verticalAlign: "top",
        horizontalAlign: "center",
        dockInsidePlotArea: true,
      },
      data: [{
        type: "line",
        name: "Singleplayer",
        showInLegend: true,
        markerSize: 0,
        dataPoints: q5
      },
        {
          type: "line",
          name: "Multiplayer",
          showInLegend: true,
          markerSize: 0,
          dataPoints: q
        }]
    });
    chart10.render();


    const chart11 = new CanvasJS.Chart("chartContainer11", {
      animationEnabled: true,
      height: this.heights[10],
      width: this.widths[10],
      theme: 'light2',
      title: {
        text: "Values of bets through time"
      },
      axisX: {
        title: 'Date',
        valueFormatString: "DD MMM,YYYY"
      },
      axisY: {
        title: "Value of bet",
      },
      toolTip: {
        shared: true,
      },
      legend: {
        verticalAlign: "top",
        horizontalAlign: "center",
        dockInsidePlotArea: false,
      },
      data: [{
        type: "rangeSplineArea",
        markerSize: 0,
        name: "min and max value of bet",
        showInLegend: true,
        toolTipContent: "{x}<br><span style=\"color:#6D77AC\">Value of bet: </span><br>Min: {y[1]}<br>Max: {y[0]}",
        dataPoints: [
          {x: new Date(2017, 6, 1), y: [30, 19]},
          {x: new Date(2017, 6, 2), y: [30, 21]},
          {x: new Date(2017, 6, 3), y: [29, 21]},
          {x: new Date(2017, 6, 4), y: [28, 20]},
          {x: new Date(2017, 6, 5), y: [29, 20]},
          {x: new Date(2017, 6, 6), y: [29, 20]},
          {x: new Date(2017, 6, 7), y: [27, 21]},
          {x: new Date(2017, 6, 8), y: [26, 20]},
          {x: new Date(2017, 6, 9), y: [30, 20]},
          {x: new Date(2017, 6, 10), y: [30, 21]},
          {x: new Date(2017, 6, 11), y: [30, 21]},
          {x: new Date(2017, 6, 12), y: [29, 21]},
          {x: new Date(2017, 6, 13), y: [27, 20]},
          {x: new Date(2017, 6, 14), y: [27, 20]},
          {x: new Date(2017, 6, 15), y: [25, 20]},
          {x: new Date(2017, 6, 16), y: [29, 20]},
          {x: new Date(2017, 6, 17), y: [28, 20]},
          {x: new Date(2017, 6, 18), y: [27, 21]},
          {x: new Date(2017, 6, 19), y: [27, 21]},
          {x: new Date(2017, 6, 20), y: [29, 21]},
          {x: new Date(2017, 6, 21), y: [29, 20]},
          {x: new Date(2017, 6, 22), y: [31, 20]},
          {x: new Date(2017, 6, 23), y: [30, 21]},
          {x: new Date(2017, 6, 24), y: [30, 20]},
          {x: new Date(2017, 6, 25), y: [31, 21]},
          {x: new Date(2017, 6, 26), y: [30, 21]},
          {x: new Date(2017, 6, 27), y: [31, 21]},
          {x: new Date(2017, 6, 28), y: [31, 21]},
          {x: new Date(2017, 6, 29), y: [31, 21]},
          {x: new Date(2017, 6, 30), y: [31, 21]},
          {x: new Date(2017, 6, 31), y: [31, 22]}
        ]
      }]
    });
    chart11.render();

    addAverages11();

    function addAverages11() {
      let dps = [];
      for (let i = 0; i < chart11.options.data[0].dataPoints.length; i++) {
        dps.push({
          x: chart11.options.data[0].dataPoints[i].x,
          y: (chart11.options.data[0].dataPoints[i].y[0] + chart11.options.data[0].dataPoints[i].y[1]) / 2
        });
      }
      chart11.options.data.push({
        type: "spline",
        name: "Average",
        showInLegend: true,
        markerType: "triangle",
        markerSize: 0,
        yValueFormatString: "##.",
        dataPoints: dps
      });
      chart11.render();
    }


  }

  searchInterval() {
    this.initializeCharts();
  }

}
