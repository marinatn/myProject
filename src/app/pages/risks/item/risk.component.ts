import {Component, OnInit} from '@angular/core';
import {RiskItemService} from "./risk.item.service";
import {APP_ROUTES} from "../../../app-routing.module";
import {APP_API_URL} from "../../../app.component";

@Component({
  selector: 'app-risk-page',
  templateUrl: './risk.component.html',
})

export class RiskComponent implements OnInit {
  protected itemUrl: string = APP_API_URL + '/risk/';
  // }
  protected readonly APP_ROUTES = {...APP_ROUTES};

  constructor(public itemService: RiskItemService) {
  }

  // ngAfterViewInit() {
  //   debugger

  ngOnInit() {
    this.itemService.initItem(this.itemUrl, APP_ROUTES.risk_page);
  }
}
