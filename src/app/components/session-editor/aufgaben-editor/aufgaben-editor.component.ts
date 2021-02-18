import { Component, OnDestroy, OnInit } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { Aufgaben } from 'src/app/interfaces/aufgaben.interface';
import { StateService } from '../../../state.service';

@Component({
  selector: 'app-aufgaben-editor',
  templateUrl: './aufgaben-editor.component.html',
  styleUrls: ['./aufgaben-editor.component.scss'],
})
export class AufgabenEditorComponent implements OnInit, OnDestroy {
  aufgabe1EditorText: string = '';
  aufgabe2EditorText: string = '';
  editor1Text: string = '';
  editor2Text: string = '';

  changedEditor1(event: EditorChangeContent | EditorChangeSelection) {
    this.editor1Text = event['editor']['root']['innerHTML'];
  }
  changedEditor2(event: EditorChangeContent | EditorChangeSelection) {
    this.editor1Text = event['editor']['root']['innerHTML'];
  }

  constructor(private StateService: StateService) {}

  async ngOnInit() {
    //VL muss das laden hier später mit der DB erstellung noch angepasst werden
    const someData = await this.StateService.getDaten();
    if (someData) {
      if (someData.aufgabenList[0]?.fragestellung) {
        this.aufgabe1EditorText = someData.aufgabenList[0].fragestellung;
      }
      if (someData.aufgabenList[1]?.fragestellung) {
        this.aufgabe2EditorText = someData.aufgabenList[1].fragestellung;
      }
    }
  }
  ngOnDestroy() {
    //VL muss das speichern woanders hingelegt werden
    const newAufgabe1: Aufgaben = { fragestellung: this.aufgabe1EditorText };
    const newAufgabe2: Aufgaben = { fragestellung: this.aufgabe2EditorText };
    this.StateService.editAufgabe1(newAufgabe1, newAufgabe2);
  }
}
