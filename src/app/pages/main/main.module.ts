import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';
import {RouterModule} from "@angular/router";
import {MainTableService} from "../main/main-table.service";
import {TableModule} from "../../modules/table/table.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule,
    RouterModule.forChild([{path: '', component: MainPage}]),
    TableModule
  ],

  declarations: [MainPage],

  providers: [
   MainTableService
  ]
})


export class MainPageModule {}
