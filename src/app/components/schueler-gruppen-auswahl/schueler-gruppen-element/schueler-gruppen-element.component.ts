import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Gruppe } from 'src/app/interfaces/gruppe.interface';
import { Schueler } from 'src/app/interfaces/schueler.interface';
import { StateService } from '../../../state.service';

@Component({
  selector: 'app-schueler-gruppen-element',
  templateUrl: './schueler-gruppen-element.component.html',
  styleUrls: ['./schueler-gruppen-element.component.scss'],
})
export class SchuelerGruppenElementComponent implements OnInit {
  titelThema: string;
  gruppenID: number;
  groesse: number;
  fillChip: Schueler = { name: 'Gruppe Leer', _id: 'dewkljf484844' };
  newSchuelerList: Schueler[] = [];
  @Input() gruppe: Gruppe;
  _myTemporalGroupId: number
  @Input() set myTemporalGroupId(inGroupId: number) {
    this._myTemporalGroupId = inGroupId;
    console.log(this._myTemporalGroupId, "asdasd")
  }
  gruppenMembers: number = 0;


  constructor(private StateService: StateService) {}
  leave() {
    console.log(this.gruppe);
    if (this.gruppenMembers > 0) {
      this.gruppenMembers -= 1;
    }
    this.StateService.gruppeSchuelerDragDropdSaveDelete(
      this.StateService.schuelerObject,
      this.gruppe._id
    );
  }
  join() {
    const newGroup: Gruppe = {
      _id: this.gruppe._id,
      groeße: this.gruppe.groeße,
      name: { ...this.gruppe.name },
      temporalCreateId: this.gruppe.temporalCreateId,
      ergebnis: [],
      schuelerList: [],
    };
    this.gruppe.ergebnis?.forEach((ergebnis) => {
      newGroup.ergebnis.push({ ...ergebnis });
    });
    this.gruppe.schuelerList?.forEach((schueler) => {
      newGroup.schuelerList.push({ ...schueler });
    });
    newGroup.schuelerList?.push({ ...this.StateService.schuelerObject });
    this.StateService.schuelerDragDropSaveDeletelul(
      newGroup,
      this.StateService.schuelerId
    );
    this.gruppenMembers += 1;
  }

  ngOnInit() {
    console.log(this.gruppe);

    this.titelThema = this.gruppe.name.name;
    this.gruppenID = this.gruppe.temporalCreateId;
    this.groesse = this.gruppe.groeße;
    this.newSchuelerList = this.gruppe.schuelerList;
    this.gruppenMembers = this.gruppe.schuelerList.length;
  }
}
