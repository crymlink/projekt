import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { Teilaufgaben } from 'src/app/interfaces/teilaufgaben.interface';
import { StateService } from '../../state.service'

@Component({
  selector: 'app-brainstorming-dashboard',
  templateUrl: './brainstorming-dashboard.component.html',
  styleUrls: ['./brainstorming-dashboard.component.scss'],
})
export class BrainstormingDashboardComponent implements OnInit {
  teilaufgabenList: any;
  title = 'appBootstrap';
  closeResult: string;
  hinweisList: any;
  textFormat: string = '';
  editorText: string = '';

  constructor(
    private StateService: StateService,
    private modalService: NgbModal
  ) {}

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    this.editorText = event['editor']['root']['innerHTML'];
  }

  onBearbeiten(){

  }

  onSave(){

  }

  testFunction(teilaufgabe: Teilaufgaben) {
    console.log(teilaufgabe);
  }
  


  ngOnInit() {
    this.StateService.getDaten().then(() => {
      if (this.StateService.data.teilAufgabenList) {
        this.teilaufgabenList = [...this.StateService.data.teilAufgabenList];
      }
      if (this.StateService.data.hinweisList) {
        this.hinweisList = [...this.StateService.data.hinweisList];
      }
    });
    this.StateService.dbSubject.subscribe((dbData) => {
      this.teilaufgabenList = [...dbData.teilAufgabenList];
      this.hinweisList = [...dbData.hinweisList];
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

