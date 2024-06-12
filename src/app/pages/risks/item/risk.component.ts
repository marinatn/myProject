import {Component, OnInit, ViewChild} from '@angular/core';
import {RiskItemService} from "./risk.item.service";
import {APP_ROUTES} from "../../../app-routing.module";

@Component({
  selector: 'app-risk-page',
  templateUrl: './risk.component.html',
})

export class RiskComponent implements OnInit {
  @ViewChild('risksModal') risksModal: any;
  protected itemUrl: string = 'http://localhost:8000/api/risk/';

  constructor(public itemService: RiskItemService) {
  }

  ngOnInit() {
    this.itemService.initItem(this.itemUrl, APP_ROUTES.risk_page);
  }

  // ngAfterViewInit() {
  //   debugger
  // }
  protected readonly APP_ROUTES = {...APP_ROUTES};
}
