import {Component} from '@angular/core';
import {ReferenceItemService} from "./reference.item.service";
import {APP_ROUTES} from "../../../app-routing.module";
import {ActivatedRoute} from "@angular/router";
import {APP_API_URL} from "../../../app.component";

@Component({
  selector: 'app-reference-page',
  templateUrl: './reference.component.html',
})

export class ReferenceComponent {
  protected itemUrl: string = APP_API_URL + '/reference/';
  protected readonly APP_ROUTES = {...APP_ROUTES};

  constructor(public itemService: ReferenceItemService, protected route: ActivatedRoute,) {
    route.params.subscribe(val => {
      this.itemService.selectedRisksText = ''
      this.itemService.initItem(this.itemUrl, APP_ROUTES.reference_page);
    });
  }
}
