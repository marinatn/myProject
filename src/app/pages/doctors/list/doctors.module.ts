import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DoctorsComponent} from './doctors.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {TableModule} from "../../../modules/table/table.module";
import {TypeaheadModule} from "../../../modules/typeahead/typeahead.module";

const routes: Routes = [
  {
    path: '',
    component: DoctorsComponent
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
  declarations: [DoctorsComponent],
  exports: [DoctorsComponent],
})
export class DoctorsModule {}
