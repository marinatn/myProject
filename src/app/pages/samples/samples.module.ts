import {RouterModule, Routes} from "@angular/router";
import {IonicModule} from "@ionic/angular";
import {TableModule} from "../../modules/table/table.module";
import {FormsModule} from "@angular/forms";
import { NgModule } from '@angular/core'
import {SamplesComponent} from "./samples.component"

const routes: Routes = [
  {
    path: '',
    component: SamplesComponent
  }
];

@NgModule({
  declarations: [
    SamplesComponent
  ],

  imports: [
    RouterModule.forChild(routes),
    IonicModule,
    TableModule,
    FormsModule,
  ],

  exports: [RouterModule],

})
export class SamplesModule { }
