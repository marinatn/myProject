import {TableServiceInterface} from "../../../interfaces/tableServiceInterface";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {AlertController} from "@ionic/angular";
import {OverlayEventDetail} from "@ionic/core/components";
import {AngularGridInstance, Column, GridOption, GridStateChange, Metrics, RowDetailView} from "angular-slickgrid";
import {Observable} from "rxjs";


export type TableRowCRUDMode = 'new' | 'edit' | 'update' | 'delete';
export type TableRowOpts = {
  item: any,
  mode: TableRowCRUDMode
}

export interface MainDataView {
  id: number;
  patient_id: string;
  patient_fio: string;
  investigation_name: string;
  status: string;
  tape: string,
  deviation: string;
  bar_code: string;
  bcp_name: string;
  date_direction: string;
  completed: string;
  direction_number: string;
  direction_date: string;
  doctor_fio: string;
  comment: string;
  date_birth: string;
  snils: string;
  policy_series: string;
  policy_number: string;
}

// export interface TimingDataView {
//   id: number;
//   code: string;
//   name: string;
//   refer: string;
// }



export class BaseTableService implements TableServiceInterface {
  item: any = {};
  constructor(protected  http: HttpClient, protected  translate: TranslateService, protected  alertController: AlertController) {
  }


  angularGrid!: AngularGridInstance;
  metrics!: Metrics;

  getTableColumns(): Column<MainDataView>[] {
    return [
    ];
  }

  toggleCompletedProperty(item: any) {
    // toggle property
    if (typeof item === 'object') {
      item.completed = !item.completed;

      // simulate a backend http call and refresh the grid row after delay
      setTimeout(() => {
        this.angularGrid.gridService.updateItemById(item.id, item, {highlightRow: false});
      }, 250);
    }
  }

  getTableOptions(): GridOption {
    return {
      // row selections
      enableAutoResize: true,
      enableCellNavigation: true,
      enableCheckboxSelector: true,
      enableRowSelection: true,
      multiSelect: false,
      rowHeight: 85,
      rowSelectionOptions: {
        // True (Single Selection), False (Multiple Selections)
        selectActiveRow: true,
      },
      autoResize: {
        container: '#table-container',
        rightPadding: 10
      },
      // enableExcelExport: true,
      // enableExcelCopyBuffer: true,
      enableFiltering: true,
      // enableFilterTrimWhiteSpace: true,
      i18n: this.translate,
      showCustomFooter: true, // display some metrics in the bottom custom footer

    };
  }

  protected _dataset: any[] = [];

  getTableData(url: string): Observable<any[]> {
    return new Observable((observer) => {
      return this.http.get(url).subscribe((data: any) => {
        this._dataset = data;
        this.angularGrid.slickGrid.invalidate();
        this.angularGrid.gridService.renderGrid();
        observer.next([...data]);
      })
    })
  }

  protected _selectedItem: any | null = null;

  get selectedItem(): any | null {
    return this._selectedItem;
  }
  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
    this.angularGrid.slickGrid.onClick.subscribe((e, args: any) => {
      const item = this.angularGrid.gridService.getDataItemByRowNumber(args.row);
      this.onRowClick(item);
      e.stopPropagation();
    });
  }

  onRowClick(item: any) {
    // should be overridden
  }

  onSelectedRowsChanged($event: any) {
    const rows = $event.detail.args.rows;
    this._selectedItem = this.angularGrid.gridService.getDataItemByRowNumber(rows[0]);

  }

  /** Dispatched event of a Grid State Changed event */
  gridStateChanged(gridState: GridStateChange) {
    console.log('Client sample, Grid State changed:: ', gridState);
  }

  /** Save current Filters, Sorters in LocaleStorage or DB */
  saveCurrentGridState() {
    console.log('Client sample, last Grid State:: ', this.angularGrid.gridStateService.getCurrentGridState());
  }

  async deleteAlert(
    itemUrl: string = '',
    header:string = 'Удаление заголовок',
    subHeader: string = 'Удаление подзаголовок',
    message:string = 'Удаление сообщение', ) {
    const item: any | null = this.selectedItem;
    if (item) {
      const alert = await this.alertController.create({
        header: header,
        subHeader: subHeader,
        message: message,
        buttons: [{
          text: 'Отмена',
          role: 'cancel',
          handler: () => {
            console.log('Alert canceled');
          },
        },
          {
            text: 'Удалить',
            role: 'confirm',
            handler: () => {
              if (item) {
                this.deleteItem({data: this.selectedItem, refresh: true}, itemUrl+item.id);
              }
            },
          },],
      });

      await alert.present();
    }
  }

  updateField(field: string, value: string) {
    if (field) {
      this.item[field as any] = value;
    }
  }

  // setFiltersDynamically() {
  //   // we can Set Filters Dynamically (or different filters) afterward through the FilterService
  //   this.angularGrid.filterService.updateFilters([
  //     {columnId: 'duration', searchTerms: [2, 25, 48, 50]},
  //     {columnId: 'complete', searchTerms: [95], operator: '<'},
  //     {columnId: 'effort-driven', searchTerms: [true]},
  //     {columnId: 'start', operator: '>=', searchTerms: ['2001-02-28']},
  //   ]);
  // }
  //
  // setSortingDynamically() {
  //   this.angularGrid.sortService.updateSorting([
  //     // orders matter, whichever is first in array will be the first sorted column
  //     {columnId: 'duration', direction: 'ASC'},
  //     {columnId: 'start', direction: 'DESC'},
  //   ]);
  // }

  gridColumns: Column[] = [];
  gridOptions: GridOption = {};
  gridData: any[] = [];
  prepareGrid(url:string) {
    this.gridColumns = this.getTableColumns();
    this.gridOptions = this.getTableOptions();
    this.getTableData(url).subscribe((data: any[]) => {
      this.gridData = data;
    });
  }

  onWillDismiss($event: Event, itemUrl:string) {
    const ev = $event as CustomEvent<OverlayEventDetail<TableRowOpts>>;
    if (ev.detail.data) {
      const mode: TableRowCRUDMode = ev.detail.data.mode;
      const item = ev.detail.data.item;
      if (ev.detail.role === 'confirm') {
        if (mode === 'new') {
          this.addItem({data: item, refresh: true}, itemUrl);
        } else if (mode === 'edit' || mode === 'update') {
          this.updateItem({data: item, refresh: true}, itemUrl + item.id);
        }
      }
    }
  }


  refreshMetrics(e: Event, args: any) {
    if (args && args.current >= 0) {
      setTimeout(() => {
        this.metrics = {
          startTime: new Date(),
          endTime: new Date(),
          itemCount: args && args.current || 0,
          totalItemCount: this._dataset.length || 0
        };
      });
    }
  }

  addItem(opts: { data: any, refresh: boolean }, url:string = '') {
    const item: any = {...opts.data};
    // item.id = this._dataset.length + 1;
    // delete item.id;
    this.http.post(url, item).subscribe((res:any) => {
      item.id = res.id;
      this._dataset.push(item);
      const rowNumber = this.angularGrid.gridService.addItem(item);
      this.angularGrid.gridService.renderGrid();
      if (rowNumber !== undefined) {
        this.angularGrid.gridService.highlightRow(rowNumber, 2000);
        this.angularGrid.gridService.setSelectedRow(rowNumber);
      }
    });
  }

  updateItem(opts: { data: any, refresh: boolean }, url: string = '') {
    const item: any = {...opts.data};
    this.http.put(url, item).subscribe((res) => {
      const rowNumber = this.angularGrid.gridService.updateItem(item);
      if (opts.refresh) {
        this.angularGrid.gridService.renderGrid();
        if (rowNumber !== undefined) {
          this.angularGrid.gridService.highlightRow(rowNumber, 2000);
          this.angularGrid.gridService.setSelectedRow(rowNumber);
        }
      }
    })
  }

  deleteItem(opts: { data: any, refresh: boolean }, url: string = '') {
    this.http.delete(url).subscribe((res) => {
      this.angularGrid.gridService.deleteItem(opts.data);
      this._selectedItem = null;
      if (opts.refresh) {
        this.angularGrid.gridService.renderGrid();
      }
    })
  }

  confirm(item: any | null, mode: TableRowCRUDMode, modalRef:any) {
    if (!item) {
      return;
    }
    const opts: TableRowOpts = {
      item: item,
      mode: mode
    }

    modalRef.dismiss(opts, 'confirm');
  }



  cancel(modalRef:any) {
    modalRef.dismiss('cancel')
  }
}
