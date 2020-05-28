import { Component, OnInit } from '@angular/core';
import {Game} from '../../model/Game';
import {DataService} from '../../data.service';
import {formatDate} from "@angular/common";
import {RankingPoint} from "../../model/RankingPoint";

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css']
})
export class RankingsComponent implements OnInit {

  currentBookmark: string;
  bestScores: Array<Game>;
  dataLoaded = false;
  message = '';
  bestRankingPoints: Array<RankingPoint>;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.changeBookmark('Today');
  }

  changeBookmark(bookmark: string){
    this.currentBookmark = bookmark;
    switch (this.currentBookmark) {
      case 'Today':
        this.message = 'Loading data...';
        this.dataService.getPeriodBestScores(formatDate(new Date(), 'yyyy-MM-dd', 'en-UK'), formatDate(new Date(), 'yyyy-MM-dd', 'en-UK')).subscribe(
          next => {
            this.bestScores = next;
            this.dataLoaded = true;
            this.message = '';
          }
        );
        break;
      case 'Week':
        this.message = 'Loading data...';
        const lastWeek = formatDate(new Date(+formatDate(new Date(), 'yyyy','en-UK'), +formatDate(new Date(), 'MM','en-UK') - 1, +formatDate(new Date(), 'dd','en-UK') - 7), 'yyyy-MM-dd', 'en-UK');
        this.dataService.getPeriodBestScores(lastWeek, formatDate(new Date(), 'yyyy-MM-dd', 'en-UK')).subscribe(
          next => {
            this.bestScores = next;
            this.dataLoaded = true;
            this.message = '';
          }
        );
        break;
      case 'Month':
        this.message = 'Loading data...';
        const lastMonth = formatDate(new Date(+formatDate(new Date(), 'yyyy','en-UK'), +formatDate(new Date(), 'MM','en-UK') - 2, +formatDate(new Date(), 'dd','en-UK')), 'yyyy-MM-dd', 'en-UK');
        this.dataService.getPeriodBestScores(lastMonth, formatDate(new Date(), 'yyyy-MM-dd', 'en-UK')).subscribe(
          next => {
            this.bestScores = next;
            this.dataLoaded = true;
            this.message = '';
          }
        );
        break;
      case 'General':
        this.message = 'Loading data...';
        this.dataService.getGeneralBestScores().subscribe(
          next => {
            this.bestScores = next;
            this.dataLoaded = true;
            this.message = '';
          }
        );
        break;
      case 'Ranking Points':
        this.message = 'Loading data...';
        this.dataService.getRankingsPoints().subscribe(
          next => {
            this.bestRankingPoints = next;
            console.log(this.bestRankingPoints);
            this.dataLoaded = true;
            this.message = '';
          }
        );
        break;
    }
  }
}
