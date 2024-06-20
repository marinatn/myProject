import {Component} from '@angular/core';
import {TestItemService} from "./test.item.service";
import {APP_ROUTES} from "../../../app-routing.module";
import {ActivatedRoute} from "@angular/router";
import {APP_API_URL} from "../../../app.component";

@Component({
  selector: 'app-test-page',
  templateUrl: './test.component.html',
})

export class TestComponent {
  protected itemUrl: string = APP_API_URL + '/test/';
  protected readonly APP_ROUTES = {...APP_ROUTES};

  constructor(public itemService: TestItemService, protected route: ActivatedRoute,) {
    route.params.subscribe(val => {
      this.itemService.selectedReferencesText = '';
      this.itemService.initItem(this.itemUrl, APP_ROUTES.reference_page);
    });
  }
}
