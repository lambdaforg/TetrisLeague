import { Component, OnInit } from '@angular/core';
import {Game} from '../../model/Game';
import {DataService} from '../../data.service';
import {formatDate} from "@angular/common";
import {RankingPoint} from "../../model/RankingPoint";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css']
})
export class RankingsComponent implements OnInit {

  pointsForm: FormGroup;
  searchInput: string;
  isSearching = false;
  currentBookmark: string;
  bestScores: Array<Game>;
  dataLoaded = false;
  message = '';
  shortage = '';
  bestRankingPoints: Array<RankingPoint>;

  constructor(private dataService: DataService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.changeBookmark('Today');
  }

  get inputName(){ return this.pointsForm.get('inputName');}

  changeBookmark(bookmark: string){
    this.shortage = '';
    this.currentBookmark = bookmark;
    switch (this.currentBookmark) {
      case 'Today':
        this.message = 'Loading data...';
        this.dataService.getPeriodBestScores(formatDate(new Date(), 'yyyy-MM-dd', 'en-UK'), formatDate(new Date(), 'yyyy-MM-dd', 'en-UK')).subscribe(
          next => {
            this.bestScores = next;
            console.log(next);
            this.pointsForm = this.formBuilder.group(
              {
                inputName: [this.searchInput, [Validators.required, Validators.minLength(4)]]
              }
            );
            this.dataLoaded = true;
            this.message = '';
            if (next.length === 0){
              this.shortage = 'There is not any today best score yet';
            }
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
            if (next.length === 0){
              this.shortage = 'There is not any week best score yet';
            }
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
            if (next.length === 0){
              this.shortage = 'There is not any month best score yet';
            }
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
            if (next.length === 0){
              this.shortage = 'There is not any general best score yet';
            }
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
            if (next.length === 0){
              this.shortage = 'There is not any best ranking points yet';
            }
          }
        );
        break;
    }
  }

  searchUser() {
    if (this.currentBookmark === 'Ranking Points'){
      if (this.bestRankingPoints.indexOf(this.bestRankingPoints.find(rankingPoint => rankingPoint.user.username === this.inputName.value)) > 0){
        this.bestRankingPoints.unshift(this.bestRankingPoints.splice(this.bestRankingPoints.findIndex(rankingPoint => rankingPoint.user.username === this.inputName.value), 1)[0]);
      }
    } else {
      if (this.bestScores.indexOf(this.bestScores.find(bestScore => bestScore.user.username === this.inputName.value)) > 0){
        this.bestScores.unshift(this.bestScores.splice(this.bestScores.findIndex(bestScore => bestScore.user.username === this.inputName.value), 1)[0]);
      }
    }
    this.searchInput = '';
    this.isSearching = true;
  }
}
