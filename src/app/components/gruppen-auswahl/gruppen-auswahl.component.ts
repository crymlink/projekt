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
  schuelerCompleteList: Schueler[];
  GruppenListIds: string[];
  GruppenNumber: number = 0;

  constructor(private StateService: StateService) { }

  drop(event: CdkDragDrop<string[]>) {
    this.StateService.drop(event);
    console.log("Sind im Drop event");

  }

  ngOnInit() {
    this.schuelerCompleteList = this.StateService.getDaten().schuelerList;
    //this.GruppenListIds.push('listOne');
    //Mit Subscription
    for(let entry of this.StateService.getDaten().gruppenList){
      this.GruppenNumber +=1;
    }

  }

}
