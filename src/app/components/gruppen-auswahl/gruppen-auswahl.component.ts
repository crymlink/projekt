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
  selector: 'app-gruppen-auswahl',
  templateUrl: './gruppen-auswahl.component.html',
  styleUrls: ['./gruppen-auswahl.component.scss'],
})
export class GruppenAuswahlComponent implements OnInit {
  schuelerCompleteList: Schueler[] = [];
  GruppenListIds: string[] = [];
  gruppen: Gruppe[] = [];
  counter: number = 0;
  groesse: number = 4;
  gruppenListe: Gruppe[] = [];
  kickStudentName: string = '<Ausgewählten Schüler>';
  kickStudent: Schueler;
  kickGruppe: Gruppe;

  constructor(private StateService: StateService) {}

  drop(event: CdkDragDrop<string[]>) {
    this.StateService.drop(event);
    const schueler: any = event.container.data[event.currentIndex];
    this.StateService.gruppeSchuelerDragDropdSaveDelete(
      schueler,
      schueler.gruppenId
    );
  }

  kicken() {
    this.StateService.deleteSchueler(this.kickStudent._id);
    console.log(this.kickStudent);

    this.gruppen.forEach((element) => {
      if (element._id == this.kickStudent.gruppenId) {
        element.schuelerList = element.schuelerList.filter(
          (schueler) => schueler._id !== this.kickStudent._id
        );
        this.StateService.editGruppe(element);
      }
    });
    this.kickStudentName = '<Ausgewählten Schüler>';
    this.getGruppen();
  }

  chipClicked(schueler) {
    this.toKickStudent(schueler);
  }

  toKickStudent(student) {
    this.kickStudentName = student.name;
    this.kickStudent = student;
  }

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
