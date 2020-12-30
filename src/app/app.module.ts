import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StateService } from './state.service';
import { LoginComponent } from './/components/login/login.component';
import { ContentEditorComponent } from './/components/session-editor/content-editor/content-editor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ContentTextComponent } from './components/session-editor/content-editor/content-text/content-text.component';
import { QuillModule } from 'ngx-quill';
import { KatexModule } from 'ng-katex';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AufgabenEditorComponent } from './components/session-editor/aufgaben-editor/aufgaben-editor.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GruppenEditorComponent } from './components/session-editor/gruppen-editor/gruppen-editor.component';
import {MatInputModule} from '@angular/material/input';
import { GruppenTableElementComponent } from './components/session-editor/gruppen-editor/gruppen-table-element/gruppen-table-element.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContentEditorComponent,
    ContentTextComponent,
    AufgabenEditorComponent,
    GruppenEditorComponent,
    GruppenTableElementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatInputModule,
    QuillModule.forRoot({
      modules: {
        formula: true,
        toolbar:[
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],

          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
          [{ 'direction': 'rtl' }],                         // text direction

          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'font': [] }],
          [{ 'align': [] }],

          ['clean'],                                         // remove formatting button

          ['formula','link', 'image', 'video']               // link and image, video
        ]
      }
    }),
    KatexModule



  ],
  providers: [StateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
