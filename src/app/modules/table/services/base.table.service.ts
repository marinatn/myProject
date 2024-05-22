import {TableServiceInterface} from "../../../interfaces/tableServiceInterface";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {AlertController} from "@ionic/angular";
import {
  AngularGridInstance,
  Column, CompoundInputFilter,
  FieldType,
  Filters,
  Formatter, FormatterResultWithHtml, FormatterResultWithText,
  GridOption,
  GridStateChange,
  Metrics, SlickGrid
} from "angular-slickgrid";
import {CustomInputFilter} from "../filters/custom.input/custom.input";
import {Observable} from "rxjs";


export type TableRowCRUDMode = 'new' | 'edit' | 'update' | 'delete';
export type TableRowOpts = {
  item: any,
  mode: TableRowCRUDMode
}

export interface ScheduleDataView {
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


function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const NB_ITEMS = 1500;

export class BaseTableService implements TableServiceInterface {
  constructor(protected  http: HttpClient, protected  translate: TranslateService, protected  alertController: AlertController) {
  }


  angularGrid!: AngularGridInstance;
  metrics!: Metrics;

  getTableColumns(): Column<ScheduleDataView>[] {
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

  updateData(url: string): Observable<Object> {
    return new Observable((observer) => {
      return this.http.get(url).subscribe((data: any) => {
        debugger
        this._dataset = data;
        this.angularGrid.slickGrid.invalidate();
        this.angularGrid.gridService.renderGrid();
        observer.next([...data]);
      })
    })
  }

  mockData(itemCount: number, startingIndex = 0): ScheduleDataView[] {
    // mock a dataset
    const tempDataset = [];
    for (let i = startingIndex; i < (startingIndex + itemCount); i++) {
      const flag: boolean = !!randomBetween(0, 1);
      const tape: string = flag ? 'Кастрля' : 'Чемодан';
      const barCode = Math.round(Math.random() * 100);
      const bcp_name: string = 'Пункт за'
      const randomYear = randomBetween(2000, 2035);
      const randomYearShort = randomBetween(10, 35);
      const randomMonth = randomBetween(1, 12);
      const randomMonthStr = (randomMonth < 10) ? `0${randomMonth}` : randomMonth;
      const randomDay = randomBetween(10, 28);
      const randomPercent = randomBetween(0, 100);
      const randomHour = randomBetween(10, 23);
      const randomTime = randomBetween(10, 59);
      const randomMilliseconds = `${randomBetween(1, 9)}${randomBetween(10, 99)}`;
      const randomIsEffort = (i % 3 === 0);

      tempDataset.push(<ScheduleDataView><unknown>{
        id: i,
        title: 'Title ' + i,
        tape: tape,
        bar_code: barCode,
        bcp_name: 'Пункт забора крови № ' + (i % 3 === 0) ? 'Ильича ' + i : i,
        completed: flag,
        date_direction: `${randomYear}-${randomMonthStr}-${randomDay}T${randomHour}:${randomTime}:${randomTime}.${randomMilliseconds}Z`,
        investigation_name: 'Исследование ' + (i ? 'мочи' : 'говна') + ' № ' + i,
        deviation: i ? 'Болеет' : 'Псих',
        patient_id: 'Пациент № ' + i,
        status: (i % 3 === 0) ? 'Жить будет' : 'Неизлечим',
      });
    }
    return tempDataset;
  }

  protected _selectedItem: any | null = null;

  get selectedItem(): any | null {
    return this._selectedItem;
  }
  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
  }

  onSelectedRowsChanged($event: any) {
    const rows = $event.detail.args.rows;
    this._selectedItem = this.angularGrid.gridService.getDataItemByRowNumber(rows[0]);
    debugger;
  }

  /** Dispatched event of a Grid State Changed event */
  gridStateChanged(gridState: GridStateChange) {
    console.log('Client sample, Grid State changed:: ', gridState);
  }

  /** Save current Filters, Sorters in LocaleStorage or DB */
  saveCurrentGridState() {
    console.log('Client sample, last Grid State:: ', this.angularGrid.gridStateService.getCurrentGridState());
  }

  async deleteAlert() {
    const item: ScheduleDataView | null = this.selectedItem;
    if (item) {
      const alert = await this.alertController.create({
        header: 'Удаляем чувака по имени ' + (item.patient_fio || '(Нету у него имени)'),
        subHeader: 'а номер его' + (item.patient_id || '(Нету у него номера)'),
        message: 'Мочим гада? ',
        buttons: [{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Alert canceled');
          },
        },
          {
            text: 'KILL HIM',
            role: 'confirm',
            handler: () => {
              if (this.selectedItem) {
                this.deleteItem({data: this.selectedItem, refresh: true})
              }
            },
          },],
      });

      await alert.present();
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

  addItem(opts: { data: ScheduleDataView, refresh: boolean }) {
    const item: ScheduleDataView = {...opts.data};
    item.id = this._dataset.length + 1;
    this._dataset.push(item);
    const rowNumber = this.angularGrid.gridService.addItem(item);
    this.angularGrid.gridService.renderGrid();
    if (rowNumber !== undefined) {
      this.angularGrid.gridService.highlightRow(rowNumber, 2000);
      this.angularGrid.gridService.setSelectedRow(rowNumber);
    }
  }

  updateItem(opts: { data: ScheduleDataView, refresh: boolean }) {
    const item: ScheduleDataView = {...opts.data};
    const rowNumber = this.angularGrid.gridService.updateItem(item);
    if (opts.refresh) {
      this.angularGrid.gridService.renderGrid();
      if (rowNumber !== undefined) {
        this.angularGrid.gridService.highlightRow(rowNumber, 2000);
        // this.angularGrid.gridService.setSelectedRow(rowNumber);
      }
    }
  }

  deleteItem(opts: { data: ScheduleDataView, refresh: boolean }) {
    this.angularGrid.gridService.deleteItem(opts.data);
    this._selectedItem = null;
    if (opts.refresh) {
      this.angularGrid.gridService.renderGrid();
    }
  }
}
