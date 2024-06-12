import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ReferencesTableService} from "./references.table.service";
import {APP_ROUTES} from "../../../app-routing.module";
import {RisksTableService} from "../../risks/list/risks.table.service";

@Component({
  selector: 'app-references-page',
  templateUrl: './references.component.html',
})

export class ReferencesComponent {
  protected indexUrl: string = 'http://localhost:8000/api/references';
  protected readonly APP_ROUTES = {...APP_ROUTES};

  constructor(
    public tableService: ReferencesTableService,
    protected route: ActivatedRoute,
    private risksService: RisksTableService) {
    route.params.subscribe(val => this.tableService.prepareGrid(this.indexUrl));
    this.risksService.fetchRisks().subscribe((risks) => {
      this.tableService.availableRisks = risks;

    })
  }

  // private formatData(data: string[]) {
  //   if (data.length === 1) {
  //     const risk = this.tableService.availableRisks.find((risk) => risk.value === data[0]);
  //     return risk.text;
  //   }
  //
  //   return `${data.length} группы риска`;
  // }
  //
  // onChangeRisks(risks: string[]) {
  //   this.tableService.item.risks = [...risks];
  //   this.selectedRisksText = this.formatData(risks);
  //   this.risksModal.dismiss();
  // }
}
