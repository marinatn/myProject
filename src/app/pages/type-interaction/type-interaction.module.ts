import {RouterModule, Routes} from "@angular/router";
import {IonicModule} from "@ionic/angular";
import {TableModule} from "../../modules/table/table.module";
import {FormsModule} from "@angular/forms";
import { NgModule } from '@angular/core'
import {TypeInteractionComponent} from "./type-interaction.component"

const routes: Routes = [
  {
    path: '',
    component: TypeInteractionComponent
  }
];

@NgModule({
  declarations: [
    TypeInteractionComponent
  ],

  imports: [
    RouterModule.forChild(routes),
    IonicModule,
    TableModule,
    FormsModule,
  ],

  exports: [RouterModule],

})
export class TypeInteractionModule { }
