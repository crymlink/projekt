import { Component, OnDestroy, OnInit } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { Aufgaben } from 'src/app/interfaces/aufgaben.interface';
import { StateService } from '../../../state.service';

@Component({
  selector: 'app-aufgaben-editor',
  templateUrl: './aufgaben-editor.component.html',
  styleUrls: ['./aufgaben-editor.component.scss']
})
export class AufgabenEditorComponent implements OnInit,OnDestroy {
  aufgabe1EditorText: string = '';
  aufgabe2EditorText: string = '';
  editor1Text: string = '';
  editor2Text: string = '';

  changedEditor1(event: EditorChangeContent | EditorChangeSelection){
    this.editor1Text = event['editor']['root']['innerHTML'];
  }
  changedEditor2(event: EditorChangeContent | EditorChangeSelection){
    this.editor1Text = event['editor']['root']['innerHTML'];
  }

  constructor(private StateService: StateService) { }

  ngOnInit() {
    //VL muss das laden hier später mit der DB erstellung noch angepasst werden
    this.aufgabe1EditorText = this.StateService.getDaten().aufgabenList[0].fragestellung;
    this.aufgabe2EditorText = this.StateService.getDaten().aufgabenList[1].fragestellung;
  }
  ngOnDestroy(){
    //VL muss das speichern woanders hingelegt werden
    const newAufgabe1: Aufgaben = {fragestellung: this.aufgabe1EditorText, _id: 'MUSS DIE DATENBANK MACHEN!!!'}
    this.StateService.editAufgabe1(newAufgabe1);
    const newAufgabe2: Aufgaben = {fragestellung: this.aufgabe2EditorText, _id: 'MUSS DIE DATENBANK MACHEN!!!'}
    this.StateService.editAufgabe2(newAufgabe2);
  }

}
