import {RouterModule, Routes} from "@angular/router";
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {Login2Component} from "./login2.component"

const routes: Routes = [
  {
    path: '',
    component: Login2Component
  }
];

@NgModule({
  declarations: [
    Login2Component
  ],

  imports: [
    RouterModule.forChild(routes),
    IonicModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  exports: [RouterModule],

})
export class Login2Module { }
