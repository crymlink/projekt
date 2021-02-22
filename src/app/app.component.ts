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
    this.someIntervall = setInterval(() => this.stateService.getDaten() , 10000);
    this.someSUbject = this.stateService.getSubscription();
  }


  constructor(private stateService: StateService){

  }



  ngOnDestroy() {
    this.someIntervall.clearInterval();
  }
}
