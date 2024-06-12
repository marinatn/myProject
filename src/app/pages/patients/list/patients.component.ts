import {Component, OnInit} from '@angular/core';
import {PatientsTableService} from "./patients.table.service";
import {APP_ROUTES} from "../../../app-routing.module";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-patients-page',
  templateUrl: './patients.component.html',
})

export class PatientsComponent {
  protected indexUrl: string = 'http://localhost:8000/api/patients';
  protected readonly APP_ROUTES = APP_ROUTES;

  constructor(public tableService: PatientsTableService, protected route: ActivatedRoute,) {
    route.params.subscribe(val => this.tableService.prepareGrid(this.indexUrl));
  }
}
