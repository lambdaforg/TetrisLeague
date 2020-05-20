import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

  @Output()
  avatarChangedEvent = new EventEmitter();

  constructor(private dataService: DataService) {

  }

  ngOnInit(): void {
    this.loadData();
  }


  onUpload() {
   this.dataService.uploadAvatar(this.user.id, this.selectedFile).subscribe(
     res => {
       this.loadData();
       this.avatarChangedEvent.emit();
     }
   );
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  private loadData() {
    this.dataService.getAvatar(this.user.id).subscribe(
      data => {
        this.avatar = data;
        this.loadData();
      }
    );
  }
}
