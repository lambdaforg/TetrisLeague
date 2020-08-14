import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {CustomerSatisfaction} from "../model/CustomerSatisfaction";
import {formatDate} from "@angular/common";
import {User} from "../model/User";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input()
  user: User
  assesment: number;
  assesed = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  assess(assessment: number) {
    this.assesment = assessment;
    console.log(this.assesment);
    this.assesed = true;
  }

  submit(){
    const newCustomerSatisfaction : CustomerSatisfaction = new CustomerSatisfaction();
    newCustomerSatisfaction.assesingUser = this.user;
    newCustomerSatisfaction.assesingDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-UK');
    newCustomerSatisfaction.assesment = this.assesment;
    console.log('footer' + newCustomerSatisfaction.assesingDate);
    console.log('footer' + newCustomerSatisfaction.assesingUser);
    this.dataService.addNewCustomerSatisfaction(newCustomerSatisfaction).subscribe(
      next => alert('You assesed the application')
    );
  }
}
