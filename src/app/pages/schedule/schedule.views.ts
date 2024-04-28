import { CustomInputFilter } from "src/app/modules/table/filters/custom.input/custom.input";
import {ViewInterface} from "../../interfaces/view.interface";
import {
  AngularGridInstance,
  Column, ExcelExportService,
  FieldType,
  Filters, FlatpickrOption,
  Formatters,
  GridOption, GridStateChange, Metrics,
  MultipleSelectOption,
  OperatorType
} from "angular-slickgrid";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {Injectable} from "@angular/core";


function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const NB_ITEMS = 1500;
const URL_SAMPLE_COLLECTION_DATA = 'assets/data/collection_500_numbers.json';

@Injectable({ providedIn: 'root' })
export class ScheduleViews implements ViewInterface {
  angularGrid!: AngularGridInstance;
  metrics!: Metrics;
  constructor(private http: HttpClient, private translate: TranslateService) { }
  getTableColumns(): Column[] {

    // @ts-ignore
    return [


      {
        id: 'title', name: '', field: 'title', sortable: true, minWidth: 10,
        type: FieldType.string, filterable: true, filter: { model: Filters.compoundInputText }
      },
      {
        id: 'description', name: 'ID Пациента', field: 'description', filterable: true, sortable: true, minWidth: 80,
        type: FieldType.string,
        filter: {
          model: CustomInputFilter, // create a new instance to make each Filter independent from each other
          enableTrimWhiteSpace: true // or use global "enableFilterTrimWhiteSpace" to trim on all Filters
        }
      },
      {
        id: 'duration', name: 'Фамилия И.О.', field: 'duration', sortable: true, type: FieldType.number, exportCsvForceToKeepAsString: true,
        minWidth: 55,
        filterable: true,
        filter: {
          collectionAsync: this.http.get<{ option: string; value: string; }[]>(URL_SAMPLE_COLLECTION_DATA),
          // collectionFilterBy & collectionSortBy accept a single or multiple options
          // we can exclude certains values 365 & 360 from the dropdown filter
          collectionFilterBy: [{
            property: 'value',
            operator: OperatorType.notEqual,
            value: 360
          }, {
            property: 'value',
            operator: OperatorType.notEqual,
            value: 365
          }],
          collectionSortBy: {
            property: 'value',
            sortDesc: true,
            fieldType: FieldType.number
          },
          customStructure: {
            value: 'value',
            label: 'label',
            optionLabel: 'value', // if selected text is too long, we can use option labels instead
            labelSuffix: 'text',
          },
          collectionOptions: {
            separatorBetweenTextLabels: ' ',
            filterResultAfterEachPass: 'chain' // options are "merge" or "chain" (defaults to "chain")
          },
          model: Filters.multipleSelect,

          // we could add certain option(s) to the "multiple-select" plugin
          filterOptions: {
            maxHeight: 250,
            width: 175,

            // if we want to display shorter text as the selected text (on the select filter itself, parent element)
            // we can use "useSelectOptionLabel" or "useSelectOptionLabelToHtml" the latter will parse html
            useSelectOptionLabelToHtml: true
          } as MultipleSelectOption
        }
      },
      {
        id: 'complete', name: 'Дата рождения', field: 'percentComplete', formatter: Formatters.percentCompleteBar, minWidth: 70, type: FieldType.number, sortable: true,
        filterable: true, filter: { model: Filters.compoundInputNumber }
      },
      {
        id: 'Услуга (исследование)', name: 'Услуга (исследование)', field: 'start', formatter: Formatters.dateIso, sortable: true, minWidth: 75,
        type: FieldType.date, filterable: true, filter: { model: Filters.compoundDate }
      },
      {
        id: 'usDateShort', name: 'Запись', field: 'usDateShort', sortable: true, minWidth: 70, width: 70,
        type: FieldType.string, filterable: true, filter: { model: Filters.compoundInputText }
      },
      // {
      //   id: 'utcDate', name: 'UTC Date', field: 'utcDate', formatter: Formatters.dateTimeIsoAmPm, sortable: true, minWidth: 115,
      //   type: FieldType.dateUtc, exportWithFormatter: true, outputType: FieldType.dateTimeIsoAmPm, filterable: true,
      //   filter: {
      //     model: Filters.compoundDate,
      //     // override any of the Flatpickr options through "filterOptions"
      //     // please note that there's no TSlint on this property since it's generic for any filter, so make sure you entered the correct filter option(s)
      //     filterOptions: { minDate: 'today' } as FlatpickrOption
      //   }
      // },
      {
        id: 'effort-driven', name: 'Cito!', field: 'effortDriven.isEffort', minWidth: 85, maxWidth: 85,
        type: FieldType.boolean,
        sortable: true,
        exportCustomFormatter: Formatters.complexObject,

        // to pass multiple formatters, use the params property
        // also these formatters are executed in sequence, so if you want the checkmark to work correctly, it has to be the last formatter defined
        formatter: Formatters.multiple,
        params: { formatters: [Formatters.complexObject, Formatters.checkmark] },

        // when the "field" string includes the dot "." notation, the library will consider this to be a complex object and Filter accordingly
        filterable: true,
        filter: {
          // We can also add HTML text to be rendered (any bad script will be sanitized) but we have to opt-in, else it will be sanitized
          // enableRenderHtml: true,
          // collection: [{ value: '', label: '' }, { value: true, label: 'True', labelPrefix: `<i class="fa fa-check"></i> ` }, { value: false, label: 'False' }],

          collection: [{ isEffort: '', label: '' }, { isEffort: true, label: 'True' }, { isEffort: false, label: 'False' }],
          customStructure: {
            value: 'isEffort',
            label: 'label'
          },
          model: Filters.singleSelect,

          // we could add certain option(s) to the "multiple-select" plugin
          filterOptions: { autoAdjustDropHeight: true } as MultipleSelectOption,
        }

      },
      // {
      //   id: 'title', name: 'Услуга (исследование)', field: 'title', sortable: true, minWidth: 55,
      //   type: FieldType.string, filterable: true, filter: { model: Filters.compoundInputText }
      // },
      //
      // {
      //   id: 'title', name: 'Статус', field: 'title', sortable: true, minWidth: 55,
      //   type: FieldType.string, filterable: true, filter: { model: Filters.compoundInputText }
      // },
      // {
      //   id: 'title', name: 'Тара', field: 'title', sortable: true, minWidth: 55,
      //   type: FieldType.string, filterable: true, filter: { model: Filters.compoundInputText }
      // },
      // {
      //   id: 'title', name: 'Отклонение', field: 'title', sortable: true, minWidth: 55,
      //   type: FieldType.string, filterable: true, filter: { model: Filters.compoundInputText }
      // },
      // {
      //   id: 'title', name: 'Штрихкод', field: 'title', sortable: true, minWidth: 55,
      //   type: FieldType.string, filterable: true, filter: { model: Filters.compoundInputText }
      // },
      // {
      //   id: 'title', name: 'Пункт забора', field: 'title', sortable: true, minWidth: 55,
      //   type: FieldType.string, filterable: true, filter: { model: Filters.compoundInputText }
      // },
      // {
      //   id: 'title', name: 'Дата направления', field: 'title', sortable: true, minWidth: 55,
      //   type: FieldType.string, filterable: true, filter: { model: Filters.compoundInputText }
      // }
    ];
  }

  getTableOptions(): GridOption {

    return {
      autoResize: {
        container: '#table-container',
        rightPadding: 10
      },
      enableExcelExport: true,
      enableExcelCopyBuffer: true,
      enableFiltering: true,
      // enableFilterTrimWhiteSpace: true,
      i18n: this.translate,
      showCustomFooter: true, // display some metrics in the bottom custom footer
      enableCellNavigation: true,
      editable: true,
      // use columnDef searchTerms OR use presets as shown below
      presets: {
        filters: [
          { columnId: 'duration', searchTerms: [10, 98] },
          // { columnId: 'complete', searchTerms: ['5'], operator: '>' },
          { columnId: 'usDateShort', operator: '<', searchTerms: ['4/20/25'] },
          // { columnId: 'effort-driven', searchTerms: [true] },
        ],
        sorters: [
          { columnId: 'duration', direction: 'DESC' },
          { columnId: 'complete', direction: 'ASC' }
        ],
      },
      // externalResources: [{new (): ExcelExportService} & typeof ExcelExportService],
    };
  }

  getTableData(): any[] {
    return this.mockData(NB_ITEMS);
  }


  mockData(itemCount: number, startingIndex = 0): any[] {
    // mock a dataset
    const tempDataset = [];
    for (let i = startingIndex; i < (startingIndex + itemCount); i++) {
      const randomDuration = Math.round(Math.random() * 100);
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

      tempDataset.push({

        id: i,

        title: 'Task ' + i,
        description: (i % 5) ? 'desc ' + i : null, // also add some random to test NULL field
        duration: randomDuration,
        percentComplete: randomPercent,
        percentCompleteNumber: randomPercent,
        start: (i % 4) ? null : new Date(randomYear, randomMonth, randomDay),          // provide a Date format
        usDateShort: `${randomMonth}/${randomDay}/${randomYearShort}`, // provide a date US Short in the dataset
        utcDate: `${randomYear}-${randomMonthStr}-${randomDay}T${randomHour}:${randomTime}:${randomTime}.${randomMilliseconds}Z`,
        effortDriven: {
          isEffort: randomIsEffort,
          label: randomIsEffort ? 'Effort' : 'NoEffort',
        }
      });
    }
    return tempDataset;
  }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
  }
  /** Dispatched event of a Grid State Changed event */
  gridStateChanged(gridState: GridStateChange) {
    console.log('Client sample, Grid State changed:: ', gridState);
  }

  /** Save current Filters, Sorters in LocaleStorage or DB */
  saveCurrentGridState() {
    console.log('Client sample, last Grid State:: ', this.angularGrid.gridStateService.getCurrentGridState());
  }

  setFiltersDynamically() {
    // we can Set Filters Dynamically (or different filters) afterward through the FilterService
    this.angularGrid.filterService.updateFilters([
      { columnId: 'duration', searchTerms: [2, 25, 48, 50] },
      { columnId: 'complete', searchTerms: [95], operator: '<' },
      { columnId: 'effort-driven', searchTerms: [true] },
      { columnId: 'start', operator: '>=', searchTerms: ['2001-02-28'] },
    ]);
  }

  setSortingDynamically() {
    this.angularGrid.sortService.updateSorting([
      // orders matter, whichever is first in array will be the first sorted column
      { columnId: 'duration', direction: 'ASC' },
      { columnId: 'start', direction: 'DESC' },
    ]);
  }

  refreshMetrics(e: Event, args: any) {
    if (args && args.current >= 0) {
      setTimeout(() => {
        this.metrics = {
          startTime: new Date(),
          endTime: new Date(),
          itemCount: args && args.current || 0,
          totalItemCount: this.getTableData().length || 0
        };
      });
    }
  }

  scrollGridBottom() {
    this.angularGrid.slickGrid.navigateBottom();
  }

  scrollGridTop() {
    this.angularGrid.slickGrid.navigateTop();
  }
}
