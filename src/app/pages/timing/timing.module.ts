import { NgModule } from '@angular/core';
import {TimingComponent} from "./timing.component";
import {RouterModule, Routes} from "@angular/router";


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
  ],
  exports: [RouterModule],
})
export class TimingModule { }
