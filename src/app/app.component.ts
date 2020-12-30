import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Datenbank } from './interfaces/datenbank.interface';
import { StateService } from './state.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'uni-Project';

  someText: any;
  someSubscription: Subscription;
  someSUbject = new Subject();
  someIntervall: any


  ngOnInit() {
    const testdb: Datenbank = this.stateService.getDaten();
    this.someIntervall = setInterval(() => this.stateService.getDaten() , 10000);
    this.someSUbject = this.stateService.getSubscription();
    this.someSubscription = this.someSUbject.subscribe((dbObject: Datenbank) => {
      this.someText = dbObject.adminPW;
      console.log("subscription"+ this.someText);
    });
  }


  constructor(private stateService: StateService){

  }



  ngOnDestroy() {
    this.someIntervall.clearInterval();
  }
}
