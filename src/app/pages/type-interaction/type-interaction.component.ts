import {Component, OnInit, ViewChild} from '@angular/core';
import {Column, GridOption} from "angular-slickgrid";
import {IonModal} from "@ionic/angular";
import {ScheduleDataView, TableRowCRUDMode, TableRowOpts} from "../../modules/table/services/base.table.service";
import {OverlayEventDetail} from "@ionic/core/components";
import {TypeInteractionDataView, TypeInteractionTableService} from "./type-interaction-table.service";



@Component({
  selector: 'app-page-interaction',
  templateUrl: 'type-interaction.component.html',
  styleUrls: ['./type-interaction.component.scss'],
})
export class TypeInteractionComponent  implements OnInit {
  gridColumns: Column[] = [];
  gridOptions: GridOption = {};
  gridData: any[] = [];
  @ViewChild('newModal') newModal: IonModal | any;
  @ViewChild('editModal') editModal: IonModal | any;
  @ViewChild('investigationModal') investigationModal: IonModal | any;
  protected newItem: TypeInteractionDataView = {
    id: 1,
    name: '',
  }

  constructor(public tableService: TypeInteractionTableService) {

  }

  ngOnInit() {
    this.prepareGrid();
  }

  prepareGrid() {
    this.gridColumns = this.tableService.getTableColumns();
    this.gridOptions = this.tableService.getTableOptions();
    this.tableService.getTableData('http://localhost:8000/api/interactions').subscribe((data: any) => {
      this.gridData = data;
    });
  }


  cancel() {
    this.newModal.dismiss(null, 'cancel');
  }

  confirm(item: TypeInteractionDataView | null, mode: TableRowCRUDMode) {
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
