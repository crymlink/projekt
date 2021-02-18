import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { StateService } from '../../state.service';
import { Schueler } from 'src/app/interfaces/schueler.interface';
import { Gruppe } from 'src/app/interfaces/gruppe.interface';
export interface Vegetable {
  name: string;
}
@Component({
  selector: 'app-schueler-gruppen-auswahl',
  templateUrl: './schueler-gruppen-auswahl.component.html',
  styleUrls: ['./schueler-gruppen-auswahl.component.scss'],
})
export class SchuelerGruppenAuswahlComponent implements OnInit {
  schuelerCompleteList: Schueler[] = [];
  GruppenListIds: string[] = [];
  gruppen: Gruppe[] = [];
  counter: number = 0;
  groesse: number = 4;
  gruppenListe: Gruppe[] = [];
  myTemporalGroupId: number;



  constructor(private StateService: StateService) {}

  deleteSchueler($event) {
    this.StateService.deleteSchueler($event._id);
  }

  async getGruppen() {
    this.counter = 0;
    const newArray: Gruppe[] = [];
    this.gruppenListe.forEach((grupp) => {
      grupp = { ...grupp };
      grupp.name = { ...grupp.name };
      grupp.groeße = this.groesse;
      newArray.push(grupp);
      this.counter = this.counter + 1;
    });
    this.gruppen = newArray;
  }

  async ngOnInit() {
    this.StateService.getDaten().then(() => {
      if (this.StateService.data.schuelerList) {
        this.schuelerCompleteList = [...this.StateService.data.schuelerList];
      }
      if (this.StateService.data.gruppenList) {
        this.gruppenListe = [...this.StateService.data.gruppenList];
      }
    });

    this.StateService.dbSubject.subscribe((data) => {
      this.myTemporalGroupId = this.StateService.getTemporalGroupId();
      if (data.gruppenList) {
        this.gruppenListe = [...data.gruppenList];
      }
      if (data.schuelerList) {
        this.schuelerCompleteList = [...data.schuelerList];
      }
      this.getGruppen();
    });
  }
}
