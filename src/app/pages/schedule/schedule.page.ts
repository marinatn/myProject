import {Component} from '@angular/core';
import {Column, GridOption} from "angular-slickgrid";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage {
  gridColumns: Column[] = [];
  gridOptions: GridOption = {};
  gridData: any[] = [];

  constructor() {
    this.prepareGrid();
  }

  prepareGrid() {
    this.gridColumns = [
      {id: 'title', name: 'Title', field: 'title', sortable: true},
      {id: 'duration', name: 'Duration (days)', field: 'duration', sortable: true},
      {id: '%', name: '% Complete', field: 'percentComplete', sortable: true},
      {id: 'start', name: 'Start', field: 'start'},
      {id: 'finish', name: 'Finish', field: 'finish'},
    ];

    this.gridOptions = {
      enableAutoResize: true,
      enableSorting: true
    };

    // fill the dataset with your data (or read it from the DB)
    this.gridData = [
      {id: 0, title: 'Task 1', duration: 45, percentComplete: 5, start: '2001-01-01', finish: '2001-01-31'},
      {id: 1, title: 'Task 2', duration: 33, percentComplete: 34, start: '2001-01-11', finish: '2001-02-04'},
    ];
  }


}
