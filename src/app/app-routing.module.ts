import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AufgabenEditorComponent } from './components/session-editor/aufgaben-editor/aufgaben-editor.component';
import { ContentEditorComponent } from './components/session-editor/content-editor/content-editor.component';
import { GruppenEditorComponent } from './components/session-editor/gruppen-editor/gruppen-editor.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'admin-content-editor', component: ContentEditorComponent },
  { path: 'admin-aufgaben-editor', component: AufgabenEditorComponent },
  { path: 'admin-gruppen-editor', component: GruppenEditorComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
