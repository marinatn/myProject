import {NgModule} from '@angular/core';
import {QrReaderComponent} from "./qr-reader.component";
import {RouterModule, Routes} from "@angular/router";
import {IonicModule} from "@ionic/angular";
import {NgForOf} from "@angular/common";


const routes: Routes = [
  {
    path: '',
    component: QrReaderComponent
  }
];


@NgModule({
  declarations: [
    QrReaderComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    IonicModule,
    NgForOf,
  ],
  exports: [RouterModule, QrReaderComponent],
})
export class QrReaderModule { }
