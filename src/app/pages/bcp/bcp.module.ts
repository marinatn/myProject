import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {BcpPage} from "./bcp.page";
import {QrModule} from "../../modules/qr/qr.module";
import {TableModule} from "../../modules/table/table.module";
import {RouterModule, Routes} from "@angular/router";
import {TimingComponent} from "../timing/timing.component";

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
    // QrModule,
    TableModule
  ],
  exports: [RouterModule],
})
export class BCPPageModule {
}
