import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { Ergebnis } from 'src/app/interfaces/ergebnis.interface';
import { Gruppe } from 'src/app/interfaces/gruppe.interface';
import { Teilaufgaben } from 'src/app/interfaces/teilaufgaben.interface';
import { StateService } from '../../state.service';

@Component({
  selector: 'app-brainstorming-dashboard',
  templateUrl: './brainstorming-dashboard.component.html',
  styleUrls: ['./brainstorming-dashboard.component.scss'],
})
export class BrainstormingDashboardComponent implements OnInit {
  teilaufgabenList: any;
  teilaufgabenListSchuelerUnique: Teilaufgaben[];
  title = 'appBootstrap';
  closeResult: string;
  hinweisList: any;
  textFormat: string = '';
  editorText: string = '';
  teilaufgabe: Teilaufgaben;
  quillTitel: string = '';
  gruppenList: Gruppe[];
  temporalId: number;
  editClicked: boolean = false;
  etherpadUrl: SafeResourceUrl;

  constructor(
    private StateService: StateService,
    private modalService: NgbModal,
    private sanitazier: DomSanitizer,
  ) {}

  bearbeitenBtn() {
    let someBoolean = false;
    if (this.temporalId) {
      this.gruppenList[this.temporalId - 1].ergebnisse.map((ergebnis) => {
        if (ergebnis.teilAufgabeId === this.teilaufgabe._id) {
          if (ergebnis.getEditedFrom) {
            someBoolean = true;
          }
        }
      });
    }
    return someBoolean;
  }

  back() {
    this.teilaufgabe = null;
  }

  saveBtn() {
    let someBoolean = false;
    this.gruppenList[this.temporalId - 1]?.ergebnisse?.map((ergebnis) => {
      if (ergebnis?.teilAufgabeId === this.teilaufgabe?._id) {
        if (ergebnis?.getEditedFrom !== this.StateService?.schuelerId) {
          someBoolean = true;
        }
      }
    });
    return someBoolean;
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    this.editorText = event['editor']['root']['innerHTML'];
  }

  onBearbeiten() {
    this.StateService.setEditToSchueler(this.teilaufgabe._id);
    this.editClicked = true;
  }

  onSave() {
    this.StateService.saveErgebnisText(this.teilaufgabe._id, this.textFormat);
    this.editClicked = false;
  }

  async testFunction(teilaufgabe: Teilaufgaben) {
    this.teilaufgabe = teilaufgabe;
    const ergebnis: Ergebnis = await this.StateService.loadErgebnis(
      teilaufgabe._id
    );
    if (ergebnis) {
      this.textFormat = ergebnis.text;
      this.quillTitel = teilaufgabe.name;
    }
  }

  ngOnInit() {
    this.etherpadUrl = this.sanitazier.bypassSecurityTrustResourceUrl('');
    this.StateService.getDaten().then(() => {
      if (this.StateService.data.teilAufgabenList) {
        this.teilaufgabenList = [...this.StateService.data.teilAufgabenList];
      }
      if (this.StateService.data.hinweisList) {
        this.hinweisList = [...this.StateService.data.hinweisList];
      }
      if (this.StateService.data.gruppenList) {
        this.gruppenList = [...this.StateService.data.gruppenList];
        console.log(this.gruppenList);
      }
      if (this.StateService.myTemporalGroupId) {
        console.log(this.temporalId);
        this.temporalId = this.StateService.myTemporalGroupId;
      }
    });
    this.StateService.dbSubject.subscribe((dbData) => {
      this.teilaufgabenList = [...dbData.teilAufgabenList];
      this.hinweisList = [...dbData.hinweisList];
      this.gruppenList = [...dbData.gruppenList];
      this.temporalId = this.StateService.myTemporalGroupId;
      console.log(this.gruppenList[this.temporalId - 1]);
    });
  }
  //MODAL LOGIC
  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
