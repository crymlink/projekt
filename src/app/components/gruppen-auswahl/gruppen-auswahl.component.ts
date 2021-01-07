import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { StateService } from '../../state.service';
import { Schueler } from 'src/app/interfaces/schueler.interface';

export interface Vegetable {
  name: string;
}
@Component({
  selector: 'app-gruppen-auswahl',
  templateUrl: './gruppen-auswahl.component.html',
  styleUrls: ['./gruppen-auswahl.component.scss']
})
export class GruppenAuswahlComponent implements OnInit {
  vegetables: Schueler[];
  GruppenListIds: string[];
  GruppenNumber: number = 0;


  drop(event: CdkDragDrop<Schueler[]>) {
    moveItemInArray(this.vegetables, event.previousIndex, event.currentIndex);
  }
  constructor(private StateService: StateService) { }

  ngOnInit() {
    this.vegetables = this.StateService.getDaten().schuelerList;
    //this.GruppenListIds.push('listOne');
    //Mit Subscription
    for(let entry of this.StateService.getDaten().gruppenList){
      this.GruppenNumber +=1;
    }
    console.log(this.GruppenNumber);

  }

}
