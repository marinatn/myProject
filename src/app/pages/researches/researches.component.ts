import {Component, OnInit, ViewChild} from '@angular/core';
import {ResearchesTableService} from "./researches.table.service";

@Component ({
  selector: 'app-researches-page',
  templateUrl: './researches.component.html',
})

export class ResearchesComponent implements OnInit {
  @ViewChild('testsModal') testsModal: any;
  protected itemUrl: string = 'http://localhost:8000/api/research/';
  protected indexUrl: string = 'http://localhost:8000/api/researches';
  selectedTestsText = 'Тесты не выбраны';

  constructor(public tableService: ResearchesTableService) {
  }

  ngOnInit() {
    this.tableService.prepareGrid(this.indexUrl);
  }

  private formatData(data: string[]) {
    if (data.length === 1) {
      const test = this.tableService.tests.find((test) => test.value === data[0]);
      return test.text;
    }

    return `${data.length} выбранных тестов`;
  }

  onChangeRisks(tests: string[]) {
    this.tableService.item.tests = [...tests];
    this.selectedTestsText = this.formatData(tests);
    this.testsModal.dismiss();
  }
}
