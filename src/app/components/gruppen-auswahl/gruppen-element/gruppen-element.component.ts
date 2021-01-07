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
  vegetables: Gruppe[];

  drop(event: CdkDragDrop<Schueler[]>) {
    moveItemInArray(this.vegetables, event.previousIndex, event.currentIndex);
  }

  constructor(private StateService: StateService) { }

  ngOnInit() {
    this.vegetables = this.StateService.getDaten().gruppenList;
    console.log(this.vegetables);

  }

}
