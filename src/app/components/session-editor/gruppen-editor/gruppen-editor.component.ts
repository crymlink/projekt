import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  themenListe: Themen[] = [];
  counter: number = 0;
  groesse: number = 4;
  constructor(private StateService: StateService) { }
  someSubject: any;
  dataSub: Subscription;

  ngOnInit() {
    this.getGruppen();
     this.someSubject = this.StateService.getSubscription();
    this.dataSub = this.someSubject.subscribe((data) => {
    const newArray: Gruppe[] = [];
    this.gruppe = [...data.gruppenList]
    this.themenListe = [...data.themenList];
    this.gruppe.forEach( (grupp)=> {
      grupp = {...grupp};
      grupp.name= {...grupp.name};
      grupp.groeße = this.groesse;
      newArray.push(grupp);
    })
    this.gruppe = newArray;
    })
  }

  async getGruppen() {
    this.counter = 0;
    const newArray: Gruppe[] = [];
    const daten = {...(await this.StateService.getDaten())};
    this.gruppe = [...daten.gruppenList]
    this.themenListe= [...daten.themenList]
    this.gruppe.forEach( (grupp)=> {
      grupp = {...grupp};
      grupp.name= {...grupp.name};
      grupp.groeße = this.groesse;
      grupp._id = grupp._id;
      newArray.push(grupp);
      this.counter = this.counter+1;
    })
    this.gruppe = newArray;
  }

  addGruppe() {
    this.counter = this.counter +1;
    let someGroup: Gruppe = {temporalCreateId: this.counter,schuelerList: [], groeße: this.groesse};
    this.gruppe.push(someGroup);
    this.StateService.saveManyGruppen(this.gruppe);
  }

  deleteGruppe() {
    if(this.gruppe[this.gruppe.length-1]?._id){
      this.counter = this.counter - 1;
      this.StateService.deleteGruppeById(this.gruppe[this.gruppe.length -1]._id);
    }
  }

  changeThema(event: any) {
    for ( const gruppe of this.gruppe) {
      if(event.id === gruppe.temporalCreateId){
        gruppe.name = event.thema;
      }
    }
    this.StateService.saveManyGruppen(this.gruppe);
  }

  isAllSelected() {
    if(this.gruppe.length <= 0) {
      return false;
    }
    for(const gruppe of this.gruppe) {
      if(!gruppe.name?.name){
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
    this.dataSub.unsubscribe();
  }

}
