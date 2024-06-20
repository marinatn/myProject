import {Component} from '@angular/core';
import {ResearchItemService} from "./research.item.service";
import {APP_ROUTES} from "../../../app-routing.module";
import {ActivatedRoute} from "@angular/router";
import {APP_API_URL} from "../../../app.component";

@Component({
  selector: 'app-test-page',
  templateUrl: './research.component.html',
})

export class ResearchComponent {
  protected itemUrl: string = APP_API_URL + '/research/';
  protected readonly APP_ROUTES = {...APP_ROUTES};

  constructor(public itemService: ResearchItemService, protected route: ActivatedRoute,) {
    route.params.subscribe(val => {
      this.itemService.selectedTestsText = '';
      this.itemService.initItem(this.itemUrl, APP_ROUTES.research_page);
    });
  }
}
