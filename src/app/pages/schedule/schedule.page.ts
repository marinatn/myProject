import {Component, OnInit, ViewChild} from '@angular/core';
import {Column, GridOption} from "angular-slickgrid";

import {IonModal} from "@ionic/angular";
import {OverlayEventDetail} from '@ionic/core/components';
import {ScheduleDataView, TableRowCRUDMode, TableRowOpts} from "../../modules/table/services/base.table.service";
import {ScheduleTableService} from "./schedule-table.service";


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  gridColumns: Column[] = [];
  gridOptions: GridOption = {};
  gridData: any[] = [];
  @ViewChild('newModal') newModal: IonModal | any;
  @ViewChild('editModal') editModal: IonModal | any;
  @ViewChild('investigationModal') investigationModal: IonModal | any;
  protected newItem: ScheduleDataView = {
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

  constructor(public tableService: ScheduleTableService) {

  }

  ngOnInit() {
    this.prepareGrid();
  }

  prepareGrid() {
    this.gridColumns = this.tableService.getTableColumns();
    this.gridOptions = this.tableService.getTableOptions();
    this.tableService.updateData('http://localhost:8000/api/tests').subscribe((data: any) => {
      this.gridData = data;
    });
  }

  cancel() {
    this.newModal.dismiss(null, 'cancel');
  }

  confirm(item: ScheduleDataView | null, mode: TableRowCRUDMode) {
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
