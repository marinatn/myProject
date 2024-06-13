import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestsComponent } from './tests.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {TypeaheadModule} from "../../../modules/typeahead/typeahead.module";
import {TableModule} from "../../../modules/table/table.module";

const routes: Routes = [
  {
    path: '',
    component: TestsComponent
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
  declarations: [TestsComponent],
  exports: [TestsComponent],
})
export class TestsModule {}
