import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TypeaheadComponent} from "./typeahead.component";
import { FormsModule } from '@angular/forms';

import {AngularSlickgridModule} from "angular-slickgrid"; // Column Definition Type Interface
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    TypeaheadComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    TypeaheadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngularSlickgridModule
  ]
})
export class TypeaheadModule {
}
