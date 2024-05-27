import {Component, OnInit, ViewChild} from '@angular/core';
import {PatientsTableService} from "./patients.table.service";

@Component ({
  selector: 'app-patients-page',
  templateUrl: './patients.component.html',
})

export class PatientsComponent implements OnInit {
  @ViewChild('risksModal') risksModal: any;
  protected itemUrl: string = 'http://localhost:8000/api/patient/';
  protected indexUrl: string = 'http://localhost:8000/api/patients';
  selectedRisksText = 'Группы риска для пациента не выбраны';


  constructor(public tableService: PatientsTableService) {
  }

  ngOnInit() {
    this.tableService.prepareGrid(this.indexUrl);
  }

  private formatData(data: string[]) {
    if (data.length === 1) {
      const risk = this.tableService.risks.find((risk) => risk.value === data[0]);
      return risk.text;
    }

    return `${data.length} группы риска для пациента`;
  }

  onChangeRisks(risks: string[]) {
    this.tableService.item.risks = [...risks];
    this.selectedRisksText = this.formatData(risks);
    this.risksModal.dismiss();
  }
}
