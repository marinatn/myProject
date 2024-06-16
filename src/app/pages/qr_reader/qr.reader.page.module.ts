import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QrReaderPageComponent} from "./qr.reader.page.component";
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {QrReaderModule} from "../../modules/qr-reader/qrReader.module";

const routes: Routes = [
  {
    path: '',
    component: QrReaderPageComponent
  }
];

@NgModule({
  declarations: [
    QrReaderPageComponent
  ],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    QrReaderModule,
    // QrReaderModule
  ],
  exports: [QrReaderPageComponent],
})
export class QrReaderPageModule {
}
