import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TestsTableService} from "./tests.table.service";
import {APP_ROUTES} from "../../../app-routing.module";
import {ReferencesTableService} from "../../references/list/references.table.service";

@Component({
  selector: 'app-tests-page',
  templateUrl: './tests.component.html',
})

export class TestsComponent implements OnInit {
  protected indexUrl: string = 'http://localhost:8000/api/tests';
  protected readonly APP_ROUTES = {...APP_ROUTES};

  constructor(
    public tableService: TestsTableService,
    protected route: ActivatedRoute,
    private refsService: ReferencesTableService) {
    route.params.subscribe(val => {
      this.refsService.fetchRefs().subscribe((refs) => {
        this.tableService.updateGridData(this.indexUrl);
      });
    });

  }

  ngOnInit() {
    this.tableService.prepareGrid(this.indexUrl)
  }
}
