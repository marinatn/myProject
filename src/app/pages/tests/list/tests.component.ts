import {Component, OnInit, ViewChild} from '@angular/core';
import {TestsTableService} from "./tests-table.service";


@Component({
  selector: 'app-page-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss'],
})
export class TestsComponent implements OnInit {
  // @ViewChild('newModal') newModal: IonModal | any;
  // @ViewChild('editModal') editModal: IonModal | any;
  //
  // protected itemUrl: string = 'http://localhost:8000/api/test/';
  // protected indexUrl: string = 'http://localhost:8000/api/tests';
  //
  // constructor(public tableService: TestsTableService) {
  // }
  //
  // ngOnInit() {
  //   this.tableService.prepareGrid(this.indexUrl);
  // }

  @ViewChild('risksModal') referencesModal: any;
  protected indexUrl: string = 'http://localhost:8000/api/tests';
  selectedReferencesText = 'Референсные значений не выбраны';


  constructor(public tableService: TestsTableService) {
  }

  ngOnInit() {
    this.tableService.prepareGrid(this.indexUrl);
  }

  private formatData(data: string[]) {
    if (data.length === 1) {
      const reference = this.tableService.references.find((reference) => reference.value === data[0]);
      return reference.text;
    }

    return `${data.length} референсных значений`;
  }

  onChangeRisks(references: string[]) {
    this.tableService.item.references = [...references];
    this.selectedReferencesText = this.formatData(references);
    this.referencesModal.dismiss();
  }

}
