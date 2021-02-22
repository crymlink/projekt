import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Aufgaben } from './interfaces/aufgaben.interface';
import { Datenbank } from './interfaces/datenbank.interface';
import { Gruppe } from './interfaces/gruppe.interface';
import { Hinweise } from './interfaces/hinweise.interface';
import { Schueler } from './interfaces/schueler.interface';
import { Teilaufgaben } from './interfaces/teilaufgaben.interface';
import { Themen } from './interfaces/themen.interface';

@Injectable({
  providedIn: 'root',
})
export class StateService implements OnInit, OnDestroy {
  addChip: string = '';
  isTeilaufgabe: boolean = false;
  data: Datenbank;
  dbSubject = new Subject<Datenbank>();
  someIntervall: any;
  sessionId: string;
  schuelerId: string;
  schuelerObject: Schueler;
  myTemporalGroupId: number;
  groupID: string;


  ngOnInit() {
    this.someIntervall = setInterval(() => this.getDaten(), 30000);
  }

  setSessionId(sessionId: string) {
    this.sessionId = sessionId;
  }

  getTemporalGroupId() {
    return this.myTemporalGroupId;
  }

  setEditToSchueler(teilAufgabeId: string) {
    const data: {
      teilAufgabeId: string;
      gruppenId: string;
      sessionId: string;
      schuelerId: string;
    } = {
      teilAufgabeId,
      gruppenId: this.groupID,
      sessionId: this.sessionId,
      schuelerId: this.schuelerId,
    };

    return this.http
      .post(`http://localhost:3000/session/setEdit`, data)
      .toPromise()
      .then((data) => {
        this.dbSubject.next(data);
      });
  }

  saveErgebnisText(teilAufgabeId: string, text: string) {
    const data: {
      teilAufgabeId: string;
      gruppenId: string;
      sessionId: string;
      schuelerId: string;
      text: string;
    } = {
      teilAufgabeId,
      gruppenId: this.groupID,
      sessionId: this.sessionId,
      schuelerId: this.schuelerId,
      text: text,
    };

    return this.http
      .post(`http://localhost:3000/session/saveErgebnis`, data)
      .toPromise()
      .then((data) => {this.dbSubject.next(data)});
  }

  async loadErgebnis(teilAufgabeId: string) {
    const data: {
      teilAufgabeId: string;
      gruppenId: string;
      sessionId: string;
      schuelerId: string;
    } = {
      teilAufgabeId,
      gruppenId: this.groupID,
      sessionId: this.sessionId,
      schuelerId: this.schuelerId,
    };
    let fetchedData = await this.http
      .post(`http://localhost:3000/session/loadErgebnis`, data)
      .toPromise();
    return await fetchedData;
  }

  login(name: string, sessionid: string) {
    return this.http
      .post(`http://localhost:3000/session/login/${sessionid}`, { name })
      .toPromise()
      .then((schueler: Schueler) => {
        if (schueler) {
          this.schuelerId = schueler._id;
          this.sessionId = sessionid;
          this.schuelerObject = schueler;
        } else {
        }
      });
  }

  async getDaten() {
    this.sessionId = 'somethingUnique';
    const id: string = this.sessionId;
    this.data = await this.http
      .get<Datenbank>(`http://localhost:3000/session/${id}`)
      .toPromise();
    if (this.schuelerId) {
      if (
        !this.data.schuelerList.find(
          (schueler) => schueler._id === this.schuelerId
        )
      ) {
        this.data.gruppenList.forEach((gruppe) => {
          gruppe.schuelerList.forEach((schueler) => {
            if (schueler._id === this.schuelerId) {
              this.myTemporalGroupId = gruppe.temporalCreateId;
              this.groupID = gruppe._id;
            }
          });
        });
      }
    } else {
      this.myTemporalGroupId = null;
    }
     this.dbSubject.next(this.data);
    return this.data;
  }

  createSession(sessionID: string) {
    const newSession: Datenbank = { session_id: sessionID };
    return this.http.post('http://localhost:3000/session/', newSession);
  }

  async editDaten(newDaten: Datenbank) {
    return this.http
      .patch(`http://localhost:3000/session/edit/${newDaten._id}`, newDaten)
      .toPromise()
      .then((data) => {
        this.data = data;
        this.dbSubject.next(this.data);
      });
  }

  getSubscription() {
    return this.dbSubject;
  }
  //Chip Click Subject to get Data in admin content editor
  chipDataSubject = new Subject<Object>();
  ifTeilAufgabeSubject = new Subject<boolean>();
  addChipSubject = new Subject<string>();
  chipClickData;

  setTeilAufgabeBool(what: boolean) {
    this.isTeilaufgabe = what;
    this.ifTeilAufgabeSubject.next(what);
  }
  //Next type of click on Hinzufügen btn
  setAddChip(type: string) {
    this.addChip = type;
    this.addChipSubject.next(type);
  }
  getAddChipString() {
    return this.addChip;
  }
  getIsTeilaufgabe() {
    return this.isTeilaufgabe;
  }

  saveChipClickData(data) {
    this.chipClickData = data;
    this.chipDataSubject.next(this.chipClickData);
  }
  getChipClikcData() {
    return this.chipClickData;
  }

  setNewThema(newThema: Themen) {
    this.data.themenList.push(newThema);
    this.editDaten(this.data);
  }

  editThema(editThema: Themen) {
    this.data.themenList = this.data.themenList.map((thema) => {
      if (thema._id === editThema._id) {
        return editThema;
      } else {
        return thema;
      }
    });
    this.editDaten(this.data);
  }

  deleteThema(_id: string) {
    this.data.themenList = this.data.themenList.filter(
      (thema) => thema._id !== _id
    );
    this.editDaten(this.data);
  }

  setSchueler(newSchueler: Schueler) {
    this.data.schuelerList.push(newSchueler);
    this.editDaten(this.data);
  }

  editSchueler(editSchueler: Schueler) {
    this.data.schuelerList = this.data.schuelerList.map((schueler) => {
      if (schueler._id === editSchueler._id) {
        return editSchueler;
      } else {
        return schueler;
      }
    });
    this.editDaten(this.data);
  }

  deleteSchueler(_id: string) {
    this.data.schuelerList = this.data.schuelerList.filter(
      (schueler) => schueler._id !== _id
    );
    this.editDaten(this.data);
  }

  saveManyGruppen(gruppe: Gruppe[]) {
    this.data.gruppenList = [...gruppe];
    this.editDaten(this.data);
  }

  editGruppe(editGruppe: Gruppe) {
    //Reference Problem MERKEN BEI ANDEREN EDITS
    this.data.gruppenList = this.data.gruppenList.map((gruppe) => {
      if (gruppe._id === editGruppe._id) {
        return editGruppe;
      } else {
        return gruppe;
      }
    });
    this.editDaten(this.data);
  }

  schuelerDragDropSaveDeletelul(editGruppe: Gruppe, _id: string) {
    this.data.gruppenList = this.data.gruppenList.map((gruppe) => {
      if (gruppe._id === editGruppe._id) {
        return editGruppe;
      } else {
        return gruppe;
      }
    });
    this.data.schuelerList = this.data.schuelerList.filter(
      (schueler) => schueler._id !== _id
    );
    this.myTemporalGroupId = editGruppe.temporalCreateId;
    this.editDaten(this.data);
  }

  gruppeSchuelerDragDropdSaveDelete(schueler: Schueler, _id: string) {
    this.data.gruppenList = this.data.gruppenList.map((gruppe) => {
      if (gruppe._id === _id) {
        gruppe.schuelerList = gruppe.schuelerList.filter(
          (gruppeSchueler) => gruppeSchueler._id !== schueler._id
        );
        return gruppe;
      } else {
        return gruppe;
      }
    });
    this.myTemporalGroupId = null;
    this.data.schuelerList.push(schueler);
    this.editDaten(this.data);
  }

  deleteGruppeById(_id: string) {
    this.data.gruppenList = this.data.gruppenList.filter(
      (gruppe) => gruppe._id !== _id
    );
    this.editDaten(this.data);
  }

  setNewTeilAufgabe(newTeilaufgabe: Teilaufgaben) {
    this.data.teilAufgabenList.push(newTeilaufgabe);
    this.editDaten(this.data);
  }
  editTeilAufgabe(editTeilAufgabe: Teilaufgaben) {
    this.data.teilAufgabenList = this.data.teilAufgabenList.map(
      (teilaufgaben) => {
        if (teilaufgaben._id === editTeilAufgabe._id) {
          return editTeilAufgabe;
        } else {
          return teilaufgaben;
        }
      }
    );
    this.editDaten(this.data);
  }
  deleteTeilAufgabe(_id: string) {
    this.data.teilAufgabenList = this.data.teilAufgabenList.filter(
      (teilaufgabe) => teilaufgabe._id !== _id
    );
    this.editDaten(this.data);
  }

  setNewHinweis(newHinweis: Hinweise) {
    this.data.hinweisList.push(newHinweis);
    this.editDaten(this.data);
  }

  editHinweis(editHinweis: Hinweise) {
    this.data.hinweisList = this.data.hinweisList.map((hinweis) => {
      if (hinweis._id === editHinweis._id) {
        return { ...editHinweis };
      } else {
        return { ...hinweis };
      }
    });

    this.editDaten(this.data);
  }

  deleteHinweis(_id: string) {
    this.data.hinweisList = this.data.hinweisList.filter(
      (hinweis) => hinweis._id !== _id
    );
    this.editDaten(this.data);
  }

  //create and delete Aufgaben Stellung
  editAufgabe1(newAufgabe: Aufgaben, aufgabe2: Aufgaben) {
    //ID wird DB setzten
    if (this.data.aufgabenList[0]) {
      this.data.aufgabenList[0].fragestellung = newAufgabe.fragestellung;
    } else {
      this.data.aufgabenList.push(newAufgabe);
    }
    if (this.data.aufgabenList[1]) {
      this.data.aufgabenList[1].fragestellung = aufgabe2.fragestellung;
    } else {
      this.data.aufgabenList.push(aufgabe2);
    }
    this.editDaten(this.data);
  }

  //Drag and Drop Event for two Components
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  ngOnDestroy() {
    this.someIntervall.clearInterval();
  }

  constructor(private http: HttpClient) {}
}
