import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ResearchComponent} from './research.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {TypeaheadModule} from "../../../modules/typeahead/typeahead.module";

const routes: Routes = [
  {
    path: '',
    component: ResearchComponent
  }
];

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    TypeaheadModule,
  ],
  declarations: [ResearchComponent],
  exports: [ResearchComponent],
})
export class ResearchModule {}
