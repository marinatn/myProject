import { NgModule } from '@angular/core';
import {TimingComponent} from "./timing.component";
import {RouterModule, Routes} from "@angular/router";
import {IonicModule} from "@ionic/angular";


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
  ],
  exports: [RouterModule],
})
export class TimingModule { }
