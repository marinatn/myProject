import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {BcpPage} from "./bcp.page";
import {TableModule} from "../../modules/table/table.module";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: BcpPage
  }
];

@NgModule({
  declarations: [BcpPage],

  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TableModule
  ],
  exports: [RouterModule],
})
export class BCPPageModule {
}
