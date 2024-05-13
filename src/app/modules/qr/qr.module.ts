import { NgModule } from '@angular/core';
import {QrComponent} from "./qr.component";
import {RouterModule, Routes} from "@angular/router";
import {IonicModule} from "@ionic/angular";
import {NgForOf} from "@angular/common";


const routes: Routes = [
  {
    path: '',
    component: QrComponent
  }
];


@NgModule({
  declarations: [
    QrComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    IonicModule,
    NgForOf,
  ],
  exports: [RouterModule, QrComponent],
})
export class QrModule { }
