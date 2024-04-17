import {Component} from '@angular/core';
import {Column, GridOption} from "angular-slickgrid";
import {ScheduleViews} from "./schedule.views";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage {
  gridColumns: Column[] = [];
  gridOptions: GridOption = {};
  gridData: any[] = [];

  constructor(public scheduleViews: ScheduleViews) {

  }

  ngOnInit() {
    this.prepareGrid();
  }

  prepareGrid() {
    this.gridColumns = this.scheduleViews.getTableColumns();
    this.gridOptions = this.scheduleViews.getTableOptions();

    this.gridData = this.scheduleViews.getTableData()
  }
}
