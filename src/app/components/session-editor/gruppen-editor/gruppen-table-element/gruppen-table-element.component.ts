import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Gruppe } from 'src/app/interfaces/gruppe.interface';
import { Themen } from 'src/app/interfaces/themen.interface';
import { StateService } from '../../../../state.service';

@Component({
  selector: 'app-gruppen-table-element',
  templateUrl: './gruppen-table-element.component.html',
  styleUrls: ['./gruppen-table-element.component.scss']
})
export class GruppenTableElementComponent implements OnInit {
  @Input() temporalId: number;
  @Input() themenListe: any;
  @Input() gruppe: Gruppe;
  @Output() changeGruppeEvent = new  EventEmitter<{id: number, thema: Themen}>();

  constructor(private StateService: StateService) {
  }

  async ngOnInit() {

  }

  changeThema(event: any) {
    for(const thema of this.themenListe) {
      if(thema.name === event){
        this.changeGruppeEvent.emit({id: this.temporalId, thema: thema});
      }
    }
  }

}
