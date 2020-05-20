import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {DataService} from '../../data.service';
import {User} from '../../model/User';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  @Input()
  user: User;
  selectedFile: File = null;
  avatar: any;
  avatarChanged = new EventEmitter();

  constructor(private dataService: DataService) {

  }

  ngOnInit(): void {
    this.loadData();
  }


  onUpload() {
   this.dataService.uploadAvatar(this.user.id, this.selectedFile).subscribe(
     res => {
       this.loadData();
     }
   );
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  private loadData() {
    this.dataService.getAvatar(this.user.id).subscribe(
      res => {
        this.avatar = res;
        this.loadData();
      }
    );
  }
}
