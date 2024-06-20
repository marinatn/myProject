import {Component, ViewChild} from '@angular/core';
import {PatientItemService} from "./patient.item.service";
import {APP_ROUTES} from "../../../app-routing.module";
import {ActivatedRoute} from "@angular/router";
import {APP_API_URL} from "../../../app.component";

@Component({
  selector: 'app-patient-page',
  templateUrl: './patient.component.html',
})

export class PatientComponent {
  @ViewChild('risksModal') risksModal: any;
  protected itemUrl: string = APP_API_URL + '/patient/';
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
