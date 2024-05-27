import {RouterModule, Routes} from "@angular/router";
import {IonicModule} from "@ionic/angular";
import {TableModule} from "../../modules/table/table.module";
import {FormsModule} from "@angular/forms";
import { NgModule } from '@angular/core'
import {DoctorsComponent} from "./doctors.component"
import {NgFor, NgTemplateOutlet} from "@angular/common";

const routes: Routes = [
  {
    path: '',
    component: DoctorsComponent
  }
];

@NgModule({
  declarations: [
    DoctorsComponent
  ],

  imports: [
    RouterModule.forChild(routes),
    IonicModule,
    TableModule,
    FormsModule,
    NgFor,
    NgTemplateOutlet
  ],

  exports: [RouterModule],

})
export class DoctorsModule { }
