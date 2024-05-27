import {Component, OnInit, ViewChild} from '@angular/core';
import {ReferencesTableService} from "./references.table.service";

@Component ({
  selector: 'app-references-page',
  templateUrl: './references.component.html',
})

export class ReferencesComponent implements OnInit {
  @ViewChild('risksModal') risksModal: any;
  protected itemUrl: string = 'http://localhost:8000/api/risk/';
  protected indexUrl: string = 'http://localhost:8000/api/risks';
  selectedRisksText = 'Группы риска не выбраны';


  constructor(public tableService: ReferencesTableService) {
  }

  ngOnInit() {
    this.tableService.prepareGrid(this.indexUrl);
  }

  private formatData(data: string[]) {
    if (data.length === 1) {
      const risk = this.tableService.risks.find((risk) => risk.value === data[0]);
      return risk.text;
    }

    return `${data.length} группы риска`;
  }

  onChangeRisks(risks: string[]) {
    this.tableService.item.risks = [...risks];
    this.selectedRisksText = this.formatData(risks);
    this.risksModal.dismiss();
  }
}
