import {Component, OnInit, ViewChild} from '@angular/core';
import {Column, GridOption} from "angular-slickgrid";

import {IonModal} from "@ionic/angular";
import {OverlayEventDetail} from '@ionic/core/components';
import {MainDataView, TableRowCRUDMode, TableRowOpts} from "../../modules/table/services/base.table.service";
import {MainTableService} from "./main-table.service";
import {APP_API_URL} from "../../app.component";


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  gridColumns: Column[] = [];
  gridOptions: GridOption = {};
  gridData: any[] = [];
  @ViewChild('newModal') newModal: IonModal | any;
  @ViewChild('editModal') editModal: IonModal | any;
  @ViewChild('investigationModal') investigationModal: IonModal | any;
  protected newItem: MainDataView = {
    id: 0,
    patient_fio: ' ',
    investigation_name: ' ',
    status: '',
    tape: ' ',
    bar_code: '',
    bcp_name: '',
    completed: '',
    deviation: '',
    patient_id: '',
    date_direction: '',
    direction_number: '',
    direction_date: '',
    doctor_fio: '',
    comment: '',
    date_birth: '',
    snils: '',
    policy_series: '',
    policy_number: ''
  }

  constructor(public tableService: MainTableService) {

  }

  ngOnInit() {
    this.prepareGrid();
  }

  prepareGrid() {
    this.gridColumns = this.tableService.getTableColumns();
    this.gridOptions = this.tableService.getTableOptions();
    this.tableService.getTableData(APP_API_URL + '/tests').subscribe((data: any) => {
      this.gridData = data;
    });
  }

  cancel() {
    this.newModal.dismiss(null, 'cancel');
  }

  confirm(item: MainDataView | null, mode: TableRowCRUDMode) {
    if (!item) {
      return;
    }
    const opts: TableRowOpts = {
      item: item,
      mode: mode
    }
    if (mode === 'edit') {
      this.editModal.dismiss(opts, 'confirm');
    } else if (mode === 'update') {
      this.investigationModal.dismiss(opts, 'confirm');
    } else if (mode === 'new') {
      this.newModal.dismiss(opts, 'confirm');
    }
  }

  onWillDismiss($event: Event) {
    const ev = $event as CustomEvent<OverlayEventDetail<TableRowOpts>>;
    if (ev.detail.data) {
      const mode: TableRowCRUDMode = ev.detail.data.mode;
      const item = ev.detail.data.item;
      if (ev.detail.role === 'confirm') {
        if (mode === 'new') {
          this.tableService.addItem({data: item, refresh: true});
        } else if (mode === 'edit' || mode === 'update') {
          this.tableService.updateItem({data: item, refresh: true});
        }
      }
    }
  }

  async deleteAlert() {
    await this.tableService.deleteAlert()
  }

  openInvestigationModal() {
    this.investigationModal.showModal();
  }

  updateField(field: string, value: string) {
    if (field) {
      // @ts-ignore
      this.tableService.selectedItem[field as any] = value;
    }
  }
}
