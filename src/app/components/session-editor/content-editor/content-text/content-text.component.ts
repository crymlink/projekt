import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { StateService } from '../../../../state.service';
import { Subject } from 'rxjs';
import { Hinweise } from 'src/app/interfaces/hinweise.interface';
import { Teilaufgaben } from 'src/app/interfaces/teilaufgaben.interface';
import { Ergebnis } from 'src/app/interfaces/ergebnis.interface';
import { Themen } from 'src/app/interfaces/themen.interface';


@Component({
  selector: 'app-content-text',
  templateUrl: './content-text.component.html',
  styleUrls: ['./content-text.component.scss']
})
export class ContentTextComponent implements OnInit {
  editorText = '';
  textFormat =''; //Shows normal text even with HTML input
  titelText='';  //Titel Input field
  isTeilAufgabe= false; //bool that checks if chip clicked is Teilaufgabe
  antwortText=''; //Antwortbox text
  clickedChip;
  typeOfAdd=''; // type of to add new Chip

  @Output() closeEvent = new EventEmitter();


  changedEditor(event: EditorChangeContent | EditorChangeSelection){
    this.editorText = event['editor']['root']['innerHTML'];
    console.log(this.editorText);
  }

  constructor(private StateService: StateService) {

  }
  //Function if hinzufüge btn is clicked
  //checks the type des chips der hinzugefügt werden muss if not leer dann wird der string gechecked
  onSaveNew(){
    if(this.typeOfAdd != ''){
      if(this.typeOfAdd === 'des Hinweises'){
        const newHinweis: Hinweise = {name: this.titelText, text: this.editorText, typ:'hinweis'};
        this.StateService.setNewHinweis(newHinweis);
      }
      if(this.typeOfAdd === 'der Teilaufgabe'){
        // _Id muss von der Datenbank hinzugefügt werden!
        const newErgebnis: Ergebnis = {text: this.antwortText, _id: 'MUSS DIE DATENBANK MACHEN!!!'}
        const newTeilaufgabe: Teilaufgaben = {name: this.titelText, text: this.editorText, typ:'teilaufgabe', ergebnis: newErgebnis};
        this.StateService.setNewTeilAufgabe(newTeilaufgabe);
      }
      if(this.typeOfAdd === 'des Themas'){
        const newThema: Themen = {name: this.titelText, text: this.editorText, typ:'thema'};
        this.StateService.setNewThema(newThema);
      }

    }else{
      //edit chip checked den typ des chips und dann wird der chip in der DB verändert
      if(this.clickedChip.typ ==='thema'){
        this.clickedChip.name = this.titelText;
        this.clickedChip.text = this.editorText;
        this.StateService.editThema(this.clickedChip);
      }
      if(this.clickedChip.typ ==='teilaufgabe'){
        this.clickedChip.name = this.titelText;
        this.clickedChip.text = this.editorText;
        this.StateService.editTeilAufgabe(this.clickedChip);
      }
      if(this.clickedChip.typ ==='hinweis'){
        this.clickedChip.name = this.titelText;
        this.clickedChip.text = this.editorText;
        this.StateService.editHinweis(this.clickedChip);
      }
    }
  }
  onDelete(){
    //löscht den geclickten chip aus der DB
    if(this.clickedChip){
      if(this.clickedChip.typ =='thema'){
        this.StateService.deleteThema(this.clickedChip._id);
      }
      if(this.clickedChip.typ =='teilaufgabe'){
        this.StateService.deleteTeilAufgabe(this.clickedChip._id);
      }
      if(this.clickedChip.typ =='hinweis'){
        this.StateService.deleteHinweis(this.clickedChip._id);
      }
    }
      this.closeEvent.emit();

  }

  ngOnInit() {

    //Subscribe on Subject to check if Teilaufgabe
    this.StateService.ifTeilAufgabeSubject.subscribe(fetchBool =>{
      this.isTeilAufgabe = fetchBool;
    })

    this.chipDataInit(this.StateService.getChipClikcData());

    //Subscribe on Subject to get Clicked Chip
    this.StateService.chipDataSubject.subscribe(fetchChip => {
      this.chipDataInit(fetchChip)



    })
    //handels the rendering of enditor if hinzufügen btn ist clicked
    this.typeOfAdd = this.StateService.getAddChipString();
    this.isTeilAufgabe = this.StateService.getIsTeilaufgabe();
    this.StateService.addChipSubject.subscribe(fetchType => {
      this.clickedChip = null;
      this.titelText = "";
      this.editorText = "";
      this.textFormat = "";
      this.antwortText= "";
      if(fetchType == 'der Teilaufgabe'){
        this.isTeilAufgabe = true;
      }else{
        this.isTeilAufgabe = false;
      }
      this.typeOfAdd = fetchType;

    })
  }

  chipDataInit(chip: any) {
    if( chip) {
      this.clickedChip = chip;
      this.typeOfAdd = '';
      this.textFormat = this.clickedChip.text;
      this.titelText  = this.clickedChip.name;
    }
  }


}
