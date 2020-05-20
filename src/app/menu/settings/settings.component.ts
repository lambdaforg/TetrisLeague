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
  message = '';
  browsePlaceholder = 'Choose file';

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
      }, error => {
        this.message = 'Invalid file extension or size';
        console.log(error.message);
      }
    );
    this.browsePlaceholder = 'Choose file';
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    this.browsePlaceholder = this.selectedFile.name;
  }

  loadData() {
    this.dataService.getAvatar(this.user.id).subscribe(
      data => {
        this.avatar = data;
        this.message = '';
        this.browsePlaceholder = 'Choose file';
      }
    );
  }
}
