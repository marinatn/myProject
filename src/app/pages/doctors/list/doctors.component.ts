import {Component} from '@angular/core';
import {DoctorsTableService} from "./doctors.table.service";
import {APP_ROUTES} from "../../../app-routing.module";
import {ActivatedRoute} from "@angular/router";
import {APP_API_URL} from "../../../app.component";

@Component({
  selector: 'app-doctors-page',
  templateUrl: './doctors.component.html',
})

export class DoctorsComponent {
  protected indexUrl: string = APP_API_URL + '/doctors';
  protected readonly APP_ROUTES = APP_ROUTES;

  constructor(public tableService: DoctorsTableService, protected route: ActivatedRoute,) {
    route.params.subscribe(val => this.tableService.prepareGrid(this.indexUrl));
  }
}
