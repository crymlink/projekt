import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Aufgaben } from './interfaces/aufgaben.interface';
import { Datenbank } from './interfaces/datenbank.interface'
import { Gruppe } from './interfaces/gruppe.interface';
import { Hinweise } from './interfaces/hinweise.interface';
import { Schueler } from './interfaces/schueler.interface';
import { Teilaufgaben } from './interfaces/teilaufgaben.interface';
import { Themen } from './interfaces/themen.interface';

@Injectable({
  providedIn: 'root'
})
export class StateService implements OnInit, OnDestroy {

  addChip: string = '';
  isTeilaufgabe: boolean = false;


  aufgabe1: Aufgaben =
  {
   fragestellung: ' Hallo wie gehts?',
  _id: 'dsjfiojoifj43'
  }

  aufgabe2: Aufgaben =
  {
   fragestellung: ' wo wohnst du?',
  _id: 'dscdsvk4jfiojoifj43'
  }

  schueler1: Schueler = {name: 'Marius', _id: 'dewkljf48484', gruppenId: '10'};
  schueler2: Schueler = {name: 'Philipp', _id: 'dewkljf484841', gruppenId: '10'};
  schueler3: Schueler = {name: 'Rezan', _id: 'dewkljf484842', gruppenId: '11'};
  schueler4: Schueler = {name: 'Tuna', _id: 'dewkljf484843', gruppenId: '11'};
  schueler5: Schueler = {name: 'Daniel', _id: 'dewkljf484844', gruppenId: '10'};
  schueler6: Schueler = {name: 'Elena', _id: 'dewkljf484845', gruppenId: '11'};
  schueler7: Schueler = {name: 'Geraldy', _id: 'dewkljf484846'};


  thema1: Themen = {_id: 'djf48932', name: 'London', text: 'Coole Hinweise und so Big Ben du weißt', typ: 'thema'}
  thema2: Themen = {_id: 'djf489321', name: 'Paris', text: 'Coole Hinweise und so Eifelturm du weißt', typ: 'thema'}
  thema3: Themen = {_id: 'djf48924321', name: 'Praag', text: 'Billig und so', typ: 'thema'}

  gruppe10: Gruppe = {temporalCreateId: 1,aufgabenList: [this.aufgabe1], name: this.thema1, schuelerList: [this.schueler1, this.schueler2, this.schueler5], _id: '10'}
  gruppe11: Gruppe = {temporalCreateId: 2,aufgabenList: [this.aufgabe2], name: this.thema2, schuelerList: [this.schueler3, this.schueler4, this.schueler6], _id: '11'}

  hinweis1: Hinweise = {_id: 'djf4893233', name: 'hilfe', text: 'Coole Hinweise und so Big Ben du weißt ist ne uhr', typ: 'hinweis'}
  hinweis2: Hinweise = {_id: 'djf489323333', name: 'hilfe2', text: 'Coole Hinweise und so Eifelturm du weißt ist Hoch', typ: 'hinweis'}

  teilaufgabe1: Teilaufgaben = {_id: 'djf48111293233', name: 'Teilaufgabe1', text: 'Uhrzeit von big ben?', ergebnis:{_id: 'asdasd1124p', text: 'A:'},  typ: 'teilaufgabe'}
  teilaufgabe2: Teilaufgaben = {_id: 'djf4118111293233', name: 'Teilaufgabe2', text: 'Wieviel streben hat der Eifelturm?', ergebnis:{_id: 'asdasd1124p3', text: 'B:'},  typ: 'teilaufgabe'}


  fakeData: Datenbank =
  {
    _id: 'fkosjfiohfiowhje33',
    session_id: '2009381',
    adminPW: 'admin',
    aufgabenList: [this.aufgabe1, this.aufgabe2],
    gruppenList: [this.gruppe10, this.gruppe11],
    schuelerList: [this.schueler1,this.schueler2,this.schueler3,this.schueler4,this.schueler5,this.schueler6,this.schueler7],
    themenList: [this.thema1, this.thema2, this.thema3],
    hinweisList: [this.hinweis1, this.hinweis2],
    teilAufgabenList: [this.teilaufgabe1, this.teilaufgabe2]
  }

  dbSubject = new Subject<Datenbank>();
  someIntervall: any

  ngOnInit() {
    this.someIntervall = setInterval(() => this.getDaten() , 30000);
  }

  getDaten() {
    console.log("getDaten");
    this.dbSubject.next(this.fakeData);
    return this.fakeData;
  }

  setDaten(newDaten: Datenbank) {
    this.fakeData = newDaten;
    this.dbSubject.next(this.fakeData);
  }

  getSubscription() {
    return this.dbSubject;
  }
  //Chip Click Subject to get Data in admin content editor
  chipDataSubject = new Subject<Object>();
  ifTeilAufgabeSubject = new Subject<boolean>();
  addChipSubject = new Subject<string>();
  chipClickData;

  setTeilAufgabeBool(what: boolean){
    this.isTeilaufgabe = what;
    this.ifTeilAufgabeSubject.next(what);
  }
  //Next type of click on Hinzufügen btn
  setAddChip(type: string){
    this.addChip = type;
    this.addChipSubject.next(type);
  }
  getAddChipString(){
    return this.addChip;
  }
  getIsTeilaufgabe() {
    return this.isTeilaufgabe;
  }


  saveChipClickData(data){
    this.chipClickData = data;
    this.chipDataSubject.next(this.chipClickData);
    console.log(this.chipClickData);
  }
  getChipClikcData(){
    return this.chipClickData;
  }


  setNewThema(newThema: Themen){
    newThema._id = "fjsdoifjiowe4";
    this.fakeData.themenList.push(newThema);
    this.getDaten();
  }

  editThema(editThema: Themen){
    this.fakeData.themenList.forEach((thema) => {
      if(thema._id === editThema._id){
        return editThema;
      }else {
        return thema;
      }
    })
    this.getDaten();
  }

  deleteThema(_id: string){
    this.fakeData.themenList = this.fakeData.themenList.filter((thema) => thema._id !== _id);
    this.getDaten();
  }

  saveManyGruppen(gruppe: Gruppe[]){
    const someId: string ="djsfiojfioj"
    const someNewArray: Gruppe[] = []
    let someObject: any;
    for(const grupp of gruppe){
      if(!grupp._id){
        grupp._id = someId;
        someNewArray.push(grupp);
        console.log("wieOft")
      }else{
        this.editGruppe(grupp);
      }
    }

    this.fakeData.gruppenList = [...this.fakeData.gruppenList, ...someNewArray];
    this.getDaten();
  }

  editGruppe(editGruppe: Gruppe){
    //Reference Problem MERKEN BEI ANDEREN EDITS
    this.fakeData.gruppenList = this.fakeData.gruppenList.map((gruppe) => {
      if(gruppe._id === editGruppe._id){
        console.log(editGruppe);
        return editGruppe;
      }else {
        return gruppe;
      }
    })
    this.getDaten();
  }

  deleteGruppeById(_id: string){
    this.fakeData.gruppenList = this.fakeData.gruppenList.filter((gruppe) => gruppe._id !== _id);
    this.getDaten();
  }



  setNewTeilAufgabe(newTeilaufgabe: Teilaufgaben){
    newTeilaufgabe._id = "fjsdoifjiowe3";
    this.fakeData.teilAufgabenList.push(newTeilaufgabe);
    this.getDaten();
  }
  editTeilAufgabe(editTeilAufgabe: Teilaufgaben){
    this.fakeData.teilAufgabenList.forEach((teilaufgaben) => {
      if(teilaufgaben._id === editTeilAufgabe._id){
        return editTeilAufgabe;
      }else {
        return teilaufgaben;
      }
    })
    this.getDaten();
  }
  deleteTeilAufgabe(_id: string){
    this.fakeData.teilAufgabenList = this.fakeData.teilAufgabenList.filter((teilaufgabe) => teilaufgabe._id !== _id);
    this.getDaten();
  }


   setNewHinweis(newHinweis: Hinweise){
    newHinweis._id = "fjsdoifjiowe5";
    this.fakeData.hinweisList.push(newHinweis);
    this.getDaten();
  }

  editHinweis(editHinweis: Hinweise){
    this.fakeData.hinweisList.forEach((hinweis) => {
      if(hinweis._id === editHinweis._id){
        return editHinweis;
      }else {
        return hinweis;
      }
    })
    this.getDaten();
  }

  deleteHinweis(_id: string){
    this.fakeData.hinweisList = this.fakeData.hinweisList.filter((hinweis) => hinweis._id !== _id);
    console.log();
    this.getDaten();
  }


  //create and delete Aufgaben Stellung
  editAufgabe1(newAufgabe: Aufgaben){
    //ID wird DB setzten
    newAufgabe._id = "fjsdowe333";
    this.fakeData.aufgabenList[0].fragestellung = newAufgabe.fragestellung;
    this.getDaten();
    console.log();
  }

  editAufgabe2(newAufgabe: Aufgaben){
    //ID wird DB setzten
    newAufgabe._id = "fjsdow44e333";
    this.fakeData.aufgabenList[1].fragestellung = newAufgabe.fragestellung;
    this.getDaten();
  }

  ngOnDestroy() {
    this.someIntervall.clearInterval();
  }


constructor() { }

}
