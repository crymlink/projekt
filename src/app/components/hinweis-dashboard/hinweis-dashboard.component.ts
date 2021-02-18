import { Component, OnInit } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { Hinweise } from 'src/app/interfaces/hinweise.interface';
import {StateService} from '../../state.service'

@Component({
  selector: 'app-hinweis-dashboard',
  templateUrl: './hinweis-dashboard.component.html',
  styleUrls: ['./hinweis-dashboard.component.scss'],
})
export class HinweisDashboardComponent implements OnInit {
  selectable = false;
  hinweise: any;
  textFormat = ''; //Shows normal text even with HTML input
  titelText = ''; //Titel Input field
  editorText = '';
  clickedChips: any;
  toAdd: boolean = false;
  showEditDiv: boolean = false;

  constructor(private StateService: StateService) {}

  onAdd() {
    this.textFormat = '';
    this.titelText = '';
    this.toAdd = true;
  }
  onSaveNew() {
    if(this.toAdd == true){
      let newChip: Hinweise = {
        name : this.titelText,
        text : this.textFormat,
        typ : 'hinweis',
      };
      this.StateService.setNewHinweis(newChip);
      this.toAdd = false;
    }else{
      this.clickedChips.typ = 'hinweis'
      this.clickedChips.name = this.titelText;
      this.clickedChips.text = this.editorText;
      this.StateService.editHinweis(this.clickedChips);
    }
  }
  onDelete() {
    this.StateService.deleteHinweis(this.clickedChips._id);
    this.textFormat = '';
    this.titelText = '';
    this.toAdd = false;
    this.clickedChips = null;
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    this.editorText = event['editor']['root']['innerHTML'];
  }

  themenChipClick(clickedChip, isTeil: boolean) {
    this.clickedChips = clickedChip;
    this.titelText = this.clickedChips.name;
    this.textFormat = this.clickedChips.text;
    this.toAdd = false;
    console.log(clickedChip);


  }

  async ngOnInit() {
    this.toAdd = false;
    this.StateService.getDaten().then(() => {
      if (this.StateService.data.hinweisList) {
        this.hinweise = [...this.StateService.data.hinweisList];
      }
    });
    this.StateService.dbSubject.subscribe((dbData) => {
      this.hinweise = [...dbData.hinweisList];
    });
  }
}
