import { Component, OnDestroy, OnInit } from '@angular/core';
import { Gruppe } from 'src/app/interfaces/gruppe.interface';
import { Themen } from 'src/app/interfaces/themen.interface';
import { StateService } from '../../../state.service';

@Component({
  selector: 'app-gruppen-editor',
  templateUrl: './gruppen-editor.component.html',
  styleUrls: ['./gruppen-editor.component.scss']
})

export class GruppenEditorComponent implements OnInit,OnDestroy {
  gruppe: Gruppe[] = [];
  counter: number = 0;
  groesse: number = 4;
  constructor(private StateService: StateService) { }

  ngOnInit() {
    this.getGruppen();
  }

  getGruppen() {
    this.counter = 0;
    const newArray: Gruppe[] = [];
    this.gruppe = [...this.StateService.getDaten().gruppenList];
    this.gruppe.forEach( (grupp)=> {
      grupp = {...grupp};
      grupp.name= {...grupp.name};
      grupp.groeße = this.groesse;
      newArray.push(grupp);
      this.counter = this.counter+1;
    })
    this.gruppe = newArray;
  }

  addGruppe() {
    this.counter = this.counter +1;
    let someGroup: Gruppe = {temporalCreateId: this.counter, groeße: this.groesse};
    this.gruppe.push(someGroup);
  }

  deleteGruppe() {
    console.log(this.gruppe[this.counter-1]?._id);
    if(this.gruppe[this.counter-1]?._id){
      this.StateService.deleteGruppeById(this.gruppe[this.counter-1]._id);
      this.getGruppen();
    }else{
      this.gruppe.pop();
      this.counter = this.counter -1;
    }

  }

  changeThema(event: any) {
    for ( const gruppe of this.gruppe) {
      if(event.id === gruppe.temporalCreateId){
        gruppe.name = event.thema;
      }
    }
    console.log(this.gruppe);

  }

  isAllSelected() {
    if(this.gruppe.length <= 0) {
      return false;
    }
    for(const gruppe of this.gruppe) {
      if(!gruppe.name){
        return false;
      }
    }
    return true;
  }

  ngOnDestroy() {
    this.gruppe = this.gruppe.map((grupp) => {
      grupp.groeße = this.groesse;
      return grupp;
    })
    this.StateService.saveManyGruppen(this.gruppe);
  }

}
