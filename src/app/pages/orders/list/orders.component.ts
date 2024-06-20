import {Component, OnInit} from '@angular/core';
import {OrdersTableService} from "./orders.table.service";
import {APP_ROUTES} from "../../../app-routing.module";
import {ActivatedRoute} from "@angular/router";
import {ResearchesTableService} from "../../researches/list/researches.table.service";
import {PatientsTableService} from "../../patients/list/patients.table.service";
import {forkJoin} from "rxjs";
import {APP_API_URL} from "../../../app.component";
import {DoctorsTableService} from "../../doctors/list/doctors.table.service";

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders.component.html',
})

export class OrdersComponent implements OnInit {
  protected indexUrl: string = APP_API_URL + '/orders';
  protected readonly APP_ROUTES = APP_ROUTES;

  constructor(
    public tableService: OrdersTableService,
    protected route: ActivatedRoute,
    private researchService: ResearchesTableService,
    private patientService: PatientsTableService,
    private doctorService: DoctorsTableService) {
    route.params.subscribe(val => {
      forkJoin([
        this.researchService.fetchResearches(),
        this.patientService.fetchPatients(),
        this.doctorService.fetchDoctors()
      ]).subscribe((res) => {
        this.tableService.updateGridData(this.indexUrl);
      })
    });
  }

  ngOnInit() {
    this.tableService.prepareGrid(this.indexUrl);
  }
}
