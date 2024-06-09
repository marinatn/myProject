import {Component, OnInit} from '@angular/core';
import {PatientsTableService} from "./patients.table.service";
import {APP_ROUTES} from "../../../app-routing.module";

@Component({
  selector: 'app-patients-page',
  templateUrl: './patients.component.html',
})

export class PatientsComponent implements OnInit {
  protected itemUrl: string = 'http://localhost:8000/api/patient';
  protected indexUrl: string = 'http://localhost:8000/api/patients';
  protected readonly APP_ROUTES = APP_ROUTES;

  constructor(public tableService: PatientsTableService) {
  }

  ngOnInit() {
    this.tableService.prepareGrid(this.indexUrl);
  }
}
