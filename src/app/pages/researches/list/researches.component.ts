import {Component, OnInit} from '@angular/core';
import {ResearchesTableService} from "./researches.table.service";
import {APP_ROUTES} from "../../../app-routing.module";
import {TestsTableService} from "../../tests/list/tests.table.service";
import {ActivatedRoute} from "@angular/router";
import {APP_API_URL} from "../../../app.component";

@Component({
  selector: 'app-researches-page',
  templateUrl: './researches.component.html',
})

export class ResearchesComponent implements OnInit {
  selectedTestsText = 'Тесты не выбраны';
  protected indexUrl: string = APP_API_URL + '/researches';
  protected readonly APP_ROUTES = APP_ROUTES;

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
}
