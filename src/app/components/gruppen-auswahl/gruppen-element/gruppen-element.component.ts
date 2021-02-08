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
  selector: 'app-gruppen-element',
  templateUrl: './gruppen-element.component.html',
  styleUrls: ['./gruppen-element.component.scss'],
})
export class GruppenElementComponent implements OnInit {
  titelThema: string;
  gruppenID: number;
  groesse: number;
  fillChip: Schueler = { name: 'Gruppe Leer', _id: 'dewkljf484844' };
  newSchuelerList: Schueler[] = [];
  @Input() gruppe: Gruppe;
  @Output() clickedChipEvent = new EventEmitter<Schueler>();
  @Output() toDeleteSchueler = new EventEmitter<Schueler>();

  constructor(private StateService: StateService) {}

  drop(event: CdkDragDrop<string[]>) {
    this.StateService.drop(event);
    this.gruppe.schuelerList = this.newSchuelerList;
    //Gruppen Id zum schüler hinzufügen, könnte sein das es DB ID werden muss !!!!!!!!!!!!!!!!!
    this.newSchuelerList.forEach((element) => {
      element.gruppenId = this.gruppe._id;
    });
    const schueler: any = event.container.data[event.currentIndex];
    this.StateService.schuelerDragDropSaveDeletelul(this.gruppe, schueler._id);
  }

  drag(event: any) {
    console.log(event);
  }

  chipClicked(chip) {
    this.clickedChipEvent.emit(chip);
  }

  ngOnInit() {
    this.titelThema = this.gruppe.name.name;
    this.gruppenID = this.gruppe.temporalCreateId;
    this.groesse = this.gruppe.groeße;
    this.newSchuelerList = this.gruppe.schuelerList;
  }
}
