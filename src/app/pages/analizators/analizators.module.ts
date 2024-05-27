import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnalizatorsComponent} from "./analizators.component";
import {RouterModule, Routes} from "@angular/router";
import {IonicModule} from "@ionic/angular";
import {TableModule} from "../../modules/table/table.module";
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: '',
    component: AnalizatorsComponent
  }
];

@NgModule({
  declarations: [
    AnalizatorsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    IonicModule,
    TableModule,
    FormsModule,
  ],

  exports: [RouterModule],
})
export class AnalizatorsModule { }
