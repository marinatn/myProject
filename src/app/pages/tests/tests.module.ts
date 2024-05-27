import {NgModule} from '@angular/core';
import {TestsComponent} from "./tests.component";
import {RouterModule, Routes} from "@angular/router";
import {IonicModule} from "@ionic/angular";
import {TableModule} from "../../modules/table/table.module";
import {FormsModule} from "@angular/forms";
import {TypeaheadModule} from "../../modules/typeahead/typeahead.module";


const routes: Routes = [
  {
    path: '',
    component: TestsComponent
  }
];


@NgModule({
  declarations: [
    TestsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    IonicModule,
    FormsModule,
    TypeaheadModule,
    TableModule,
  ],
  exports: [RouterModule],
})
export class TestsModule { }
