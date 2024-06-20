import {Component} from '@angular/core';
import {RisksTableService} from "./risks.table.service";
import {APP_ROUTES} from "../../../app-routing.module";
import {ActivatedRoute} from "@angular/router";
import {APP_API_URL} from "../../../app.component";

@Component({
  selector: 'app-risks-page',
  templateUrl: './risks.component.html',
})

export class RisksComponent {
  protected indexUrl: string = APP_API_URL + '/risks';
  protected readonly APP_ROUTES = APP_ROUTES;

  constructor(public tableService: RisksTableService, protected route: ActivatedRoute,) {
    route.params.subscribe(val => this.tableService.prepareGrid(this.indexUrl));
  }
}
