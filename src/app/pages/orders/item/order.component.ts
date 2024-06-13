import {Component} from '@angular/core';
import {OrderItemService} from "./order.item.service";
import {APP_ROUTES} from "../../../app-routing.module";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-test-page',
  templateUrl: './order.component.html',
})

export class OrderComponent {
  protected itemUrl: string = 'http://localhost:8000/api/order/';
  protected readonly APP_ROUTES = {...APP_ROUTES};

  constructor(public itemService: OrderItemService, protected route: ActivatedRoute,) {
    route.params.subscribe(val => {
      this.itemService.selectedResearchesText = '';
      this.itemService.selectedPatientText = 'Пациент не выбран';
      this.itemService.initItem(this.itemUrl, APP_ROUTES.order_page);
    });
  }
}
