import { Component, OnInit } from '@angular/core';
import { StateService } from '../../../state.service';
export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-content-editor',
  templateUrl: './content-editor.component.html',
  styleUrls: ['./content-editor.component.scss']
})
export class ContentEditorComponent implements OnInit {
  visible = true;
  selectable = false;
  removable = true;
  addOnBlur = true;
  themen: any;
  teilAufgaben: any;
  hinweise: any;
  editorDiv = false;

  //onAdd shows editorDiv then nexts one of three strings to addSubject
  onAdd(type: string){
    this.editorDiv = true;
    if(type == 'hinweis'){
      this.StateService.setTeilAufgabeBool(false);
      this.StateService.setAddChip('des Hinweises');
    }else if(type == 'teil'){
      this.StateService.setTeilAufgabeBool(true);
      this.StateService.setAddChip('der Teilaufgabe');
    }else{
      this.StateService.setTeilAufgabeBool(false);
      this.StateService.setAddChip('des Themas');
    }
  }

  //themenChipClick shows editorDiv checks if clicked chip is teilaufgabe then if yes nexted boolSubject and then nexted the clicked Chip in chipSubject
  themenChipClick(clickedChip, isTeil: boolean){
    this.editorDiv = true;
    this.StateService.setTeilAufgabeBool(isTeil);
    this.StateService.saveChipClickData(clickedChip);
  }

  constructor(private StateService: StateService) {
    //Fills the chiplist with Datenbank Chips muss maybe noch mit Subscription gemacht werden!

  }




  async ngOnInit() {
    this.StateService.getDaten().then(() => {
      if (this.StateService.data.themenList) {
        this.themen = [...this.StateService.data.themenList];
      }
      if (this.StateService.data.teilAufgabenList) {
        this.teilAufgaben = [...this.StateService.data.teilAufgabenList];
      }
      if (this.StateService.data.hinweisList) {
        this.hinweise = [...this.StateService.data.hinweisList];
      }
    });
    this.StateService.dbSubject.subscribe( dbData =>{
      this.themen = dbData.themenList;
      this.teilAufgaben = dbData.teilAufgabenList;
      this.hinweise = dbData.hinweisList;
    })
  }

}
