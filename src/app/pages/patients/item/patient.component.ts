import {Component, OnInit, ViewChild} from '@angular/core';
import {PatientItemService} from "./patient.item.service";
import {APP_ROUTES} from "../../../app-routing.module";

@Component({
  selector: 'app-patients-page',
  templateUrl: './patient.component.html',
})

export class PatientComponent implements OnInit {
  @ViewChild('risksModal') risksModal: any;
  protected itemUrl: string = 'http://localhost:8000/api/patient/';

  constructor(public itemService: PatientItemService) {
  }

  ngOnInit() {
    this.itemService.initItem(this.itemUrl, APP_ROUTES.patient_page);
  }

  // ngAfterViewInit() {
  //   debugger
  // }
  protected readonly APP_ROUTES = APP_ROUTES;
}
