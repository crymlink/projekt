import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GruppenAuswahlComponent } from './components/gruppen-auswahl/gruppen-auswahl.component';
import { HinweisDashboardComponent } from './components/hinweis-dashboard/hinweis-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AufgabenEditorComponent } from './components/session-editor/aufgaben-editor/aufgaben-editor.component';
import { ContentEditorComponent } from './components/session-editor/content-editor/content-editor.component';
import { GruppenEditorComponent } from './components/session-editor/gruppen-editor/gruppen-editor.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin-content-editor', component: ContentEditorComponent },
  { path: 'admin-aufgaben-editor', component: AufgabenEditorComponent },
  { path: 'admin-gruppen-editor', component: GruppenEditorComponent },
  { path: 'app-gruppen-auswahl', component: GruppenAuswahlComponent },
  { path: 'app-hinweis-dashboard', component: HinweisDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
