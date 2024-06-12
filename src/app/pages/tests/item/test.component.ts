import {Component, OnInit, ViewChild} from '@angular/core';
import {TestItemService} from "./test.item.service";
import {APP_ROUTES} from "../../../app-routing.module";

@Component({
  selector: 'app-risk-page',
  templateUrl: './test.component.html',
})

export class TestComponent implements OnInit {
  @ViewChild('risksModal') risksModal: any;
  protected itemUrl: string = 'http://localhost:8000/api/test/';

  constructor(public itemService: TestItemService) {
  }

  ngOnInit() {
    this.itemService.initItem(this.itemUrl, APP_ROUTES.test_page);
  }

  // ngAfterViewInit() {
  //   debugger
  // }
  protected readonly APP_ROUTES = {...APP_ROUTES};
}
