import {Component, OnInit, ViewChild} from '@angular/core';
import {ResearchesTableService} from "./researches.table.service";
import {APP_ROUTES} from "../../../app-routing.module";
import {TestsTableService} from "../../tests/list/tests.table.service";
import {ActivatedRoute} from "@angular/router";
import {ReferencesTableService} from "../../references/list/references.table.service";

@Component ({
  selector: 'app-researches-page',
  templateUrl: './researches.component.html',
})

export class ResearchesComponent implements OnInit {
  protected indexUrl: string = 'http://45.141.100.40/api/researches';
  selectedTestsText = 'Тесты не выбраны';

  constructor(
    public tableService: ResearchesTableService,
    protected route: ActivatedRoute,
    private testsService: TestsTableService) {
    route.params.subscribe(val => {
      this.testsService.fetchTests().subscribe((tests) => {
        this.tableService.updateGridData(this.indexUrl);
      })
    });

  }

  ngOnInit() {
    this.tableService.prepareGrid(this.indexUrl);
  }

  protected readonly APP_ROUTES = APP_ROUTES;
}
