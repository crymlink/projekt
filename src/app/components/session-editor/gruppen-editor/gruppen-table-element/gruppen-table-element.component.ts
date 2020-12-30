import { Component, OnInit } from '@angular/core';
import { StateService } from '../../../../state.service';

@Component({
  selector: 'app-gruppen-table-element',
  templateUrl: './gruppen-table-element.component.html',
  styleUrls: ['./gruppen-table-element.component.scss']
})
export class GruppenTableElementComponent implements OnInit {
  gruppenCounter = 1;
  db: any;
  themenListe: any;

  constructor(private StateService: StateService) {
    this.db = this.StateService.getDaten();
    this.themenListe = this.db.themenList
    console.log(this.themenListe);
  }

  ngOnInit() {

  }

}
