import {NgModule} from '@angular/core';
import {QrCreatorComponent} from "./qr-creator.component";
import {RouterModule} from "@angular/router";
import {IonicModule} from "@ionic/angular";
import {NgForOf} from "@angular/common";


@NgModule({
  declarations: [
    QrCreatorComponent
  ],
  imports: [
    IonicModule,
    NgForOf,
  ],
  exports: [RouterModule, QrCreatorComponent],
})
export class QrCreatorModule { }
