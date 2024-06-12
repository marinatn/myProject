import {Component} from '@angular/core';
import {PatientsTableService} from "./patients.table.service";
import {APP_ROUTES} from "../../../app-routing.module";
import {ActivatedRoute} from "@angular/router";
import {RisksTableService} from "../../risks/list/risks.table.service";

@Component({
  selector: 'app-patients-page',
  templateUrl: './patients.component.html',
})

export class PatientsComponent {
  protected indexUrl: string = 'http://localhost:8000/api/patients';
  protected readonly APP_ROUTES = APP_ROUTES;

  constructor(
    public tableService: PatientsTableService,
    protected route: ActivatedRoute,
    private risksService: RisksTableService) {
    route.params.subscribe(val => this.tableService.prepareGrid(this.indexUrl));
    this.risksService.fetchRisks().subscribe((risks) => {
      this.tableService.availableRisks = risks;

    })
  }
}
