import {Component, ViewChild} from '@angular/core';
import {PatientItemService} from "./patient.item.service";
import {APP_ROUTES} from "../../../app-routing.module";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-patient-page',
  templateUrl: './patient.component.html',
})

export class PatientComponent {
  @ViewChild('risksModal') risksModal: any;
  protected itemUrl: string = 'http://45.141.100.40/api/patient/';
  // }
  protected readonly APP_ROUTES = {...APP_ROUTES};


  // ngAfterViewInit() {
  //   debugger

  constructor(public itemService: PatientItemService, protected route: ActivatedRoute,) {
    route.params.subscribe(val => {
      this.itemService.selectedRisksText = ''
      this.itemService.initItem(this.itemUrl, APP_ROUTES.patient_page);
    });
  }
}
