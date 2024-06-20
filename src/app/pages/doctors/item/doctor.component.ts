import {Component, OnInit} from '@angular/core';
import {DoctorItemService} from "./doctor.item.service";
import {APP_ROUTES} from "../../../app-routing.module";
import {APP_API_URL} from "../../../app.component";

@Component({
  selector: 'app-doctor-page',
  templateUrl: './doctor.component.html',
})

export class DoctorComponent implements OnInit {
  protected itemUrl: string = APP_API_URL + '/doctor/';
  // }
  protected readonly APP_ROUTES = {...APP_ROUTES};

  constructor(public itemService: DoctorItemService) {
  }

  // ngAfterViewInit() {
  //   debugger

  ngOnInit() {
    this.itemService.initItem(this.itemUrl, APP_ROUTES.risk_page);
  }
}
