import {Component, OnInit, ViewChild} from '@angular/core';
import {OrdersTableService} from "./orders.table.service";
import {APP_ROUTES} from "../../../app-routing.module";
import {TestsTableService} from "../../tests/list/tests.table.service";
import {ActivatedRoute} from "@angular/router";
import {ReferencesTableService} from "../../references/list/references.table.service";
import {ResearchesTableService} from "../../researches/list/researches.table.service";
import {PatientsTableService} from "../../patients/list/patients.table.service";
import {forkJoin} from "rxjs";

@Component ({
  selector: 'app-orders-page',
  templateUrl: './orders.component.html',
})

export class OrdersComponent implements OnInit {
  protected indexUrl: string = 'http://45.141.100.40/api/orders';

  constructor(
    public tableService: OrdersTableService,
    protected route: ActivatedRoute,
    private researchService: ResearchesTableService,
    private patientService: PatientsTableService) {
    route.params.subscribe(val => {
      forkJoin([this.researchService.fetchResearches(), this.patientService.fetchPatients()]).subscribe((res) => {
        this.tableService.updateGridData(this.indexUrl);
      })
    });
  }

  ngOnInit() {
    this.tableService.prepareGrid(this.indexUrl);
  }

  protected readonly APP_ROUTES = APP_ROUTES;
}
