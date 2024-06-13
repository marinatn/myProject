import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ReferencesTableService} from "./references.table.service";
import {APP_ROUTES} from "../../../app-routing.module";
import {RisksTableService} from "../../risks/list/risks.table.service";

@Component({
  selector: 'app-references-page',
  templateUrl: './references.component.html',
})

export class ReferencesComponent implements OnInit{
  protected indexUrl: string = 'http://localhost:8000/api/references';
  protected readonly APP_ROUTES = {...APP_ROUTES};

  constructor(
    public tableService: ReferencesTableService,
    protected route: ActivatedRoute,
    private risksService: RisksTableService) {
    route.params.subscribe(val => {
      this.risksService.fetchRisks().subscribe((risks) => {
        this.tableService.availableRefs = risks;
      })
    });

  }

  ngOnInit() {
    this.tableService.prepareGrid(this.indexUrl)
  }
}
