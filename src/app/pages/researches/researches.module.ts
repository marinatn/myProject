import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ResearchesComponent} from './researches.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {TableModule} from "../../modules/table/table.module";
import {TypeaheadModule} from "../../modules/typeahead/typeahead.module";
import {QrCreatorModule} from "../../modules/qr-creator/qr-creator.module";

const routes: Routes = [
  {
    path: '',
    component: ResearchesComponent
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
    QrCreatorModule
  ],
  declarations: [ResearchesComponent],
  exports: [ResearchesComponent],
})
export class ResearchesModule {}
