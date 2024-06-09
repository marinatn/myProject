import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PatientsComponent} from './patients.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {TableModule} from "../../../modules/table/table.module";
import {TypeaheadModule} from "../../../modules/typeahead/typeahead.module";

const routes: Routes = [
  {
    path: '',
    component: PatientsComponent
  }
];

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    TypeaheadModule,
    TableModule,
  ],
  declarations: [PatientsComponent],
  exports: [PatientsComponent],
})
export class PatientsModule {}
