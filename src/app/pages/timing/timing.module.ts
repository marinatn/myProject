import { NgModule } from '@angular/core';
import {TimingComponent} from "./timing.component";
import {RouterModule, Routes} from "@angular/router";
import {IonicModule} from "@ionic/angular";
import {TableModule} from "../../modules/table/table.module";
import {FormsModule} from "@angular/forms";


const routes: Routes = [
  {
    path: '',
    component: TimingComponent
  }
];


@NgModule({
  declarations: [
    TimingComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    IonicModule,
    TableModule,
    FormsModule,
  ],
  exports: [RouterModule],
})
export class TimingModule { }
