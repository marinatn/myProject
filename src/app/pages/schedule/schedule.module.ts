import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulePageRoutingModule } from './schedule-routing.module';

import { SchedulePage } from './schedule.page';
import {TableModule} from "../../modules/table/table.module";
import {ScheduleViews} from "./schedule.views";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulePageRoutingModule,
    TableModule
  ],
  declarations: [SchedulePage],
  providers: [
    ScheduleViews
  ]
})
export class SchedulePageModule {}
