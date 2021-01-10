import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Gruppe } from 'src/app/interfaces/gruppe.interface';
import { Schueler } from 'src/app/interfaces/schueler.interface';
import { StateService } from '../../../state.service';

@Component({
  selector: 'app-gruppen-element',
  templateUrl: './gruppen-element.component.html',
  styleUrls: ['./gruppen-element.component.scss']
})
export class GruppenElementComponent implements OnInit {
  gruppenListe: Gruppe[];
  titelThema: string;
  gruppenID: number;
  fillChip: Schueler = {name: 'Gruppe Leer', _id: 'dewkljf484844'};
  newSchuelerList: Schueler[] = [];



  constructor(private StateService: StateService) { }

  drop(event: CdkDragDrop<string[]>) {
    this.StateService.drop(event);
    console.log("Sind im Drop event");
  }

  ngOnInit() {
    this.gruppenListe = this.StateService.getDaten().gruppenList;
    console.log(this.gruppenListe);
    this.titelThema = this.gruppenListe[0].name.name;
    this.gruppenID = this.gruppenListe[0].temporalCreateId;


  }

}
