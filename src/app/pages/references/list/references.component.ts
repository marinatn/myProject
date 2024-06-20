import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ReferencesTableService} from "./references.table.service";
import {APP_ROUTES} from "../../../app-routing.module";
import {RisksTableService} from "../../risks/list/risks.table.service";
import {APP_API_URL} from "../../../app.component";

@Component({
  selector: 'app-references-page',
  templateUrl: './references.component.html',
})

export class ReferencesComponent implements OnInit{
  protected indexUrl: string = APP_API_URL + '/references';
  protected readonly APP_ROUTES = {...APP_ROUTES};

  constructor(
    public tableService: ReferencesTableService,
    protected route: ActivatedRoute,
    private risksService: RisksTableService) {
    route.params.subscribe(val => {
      this.risksService.fetchRisks().subscribe((risks) => {
        this.tableService.updateGridData(this.indexUrl);
      })
    });

  }

  ngOnInit() {
    this.tableService.prepareGrid(this.indexUrl)
  }
}
