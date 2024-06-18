import {Component, OnInit} from '@angular/core';
import {RisksTableService} from "./risks.table.service";
import {APP_ROUTES} from "../../../app-routing.module";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-risks-page',
  templateUrl: './risks.component.html',
})

export class RisksComponent {
  protected indexUrl: string = 'http://45.141.100.40/api/risks';
  protected readonly APP_ROUTES = APP_ROUTES;

  constructor(public tableService: RisksTableService, protected route: ActivatedRoute,) {
    route.params.subscribe(val => this.tableService.prepareGrid(this.indexUrl));
  }
}
