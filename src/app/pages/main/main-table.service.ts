import {TableServiceInterface} from "../../interfaces/tableServiceInterface";
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
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {Injectable} from "@angular/core";
import {CustomInputFilter} from "../../modules/table/filters/custom.input/custom.input";
import {AlertController} from "@ionic/angular";
import {BaseTableService, MainDataView} from "../../modules/table/services/base.table.service";

@Injectable({providedIn: 'root'})
export class MainTableService extends BaseTableService implements TableServiceInterface {
  constructor(
    override http: HttpClient,
    protected override translate: TranslateService,
    protected override alertController: AlertController) {
    super(http, translate, alertController);
  }
  protected override _selectedItem: MainDataView | null = null;
  override get selectedItem(): MainDataView | null {
    return this._selectedItem;
  }


  override getTableColumns():Column[] {
    return [
      {
        id: 'completed', name: ' ', field: 'completed', type: FieldType.number, sortable: true, minWidth: 20,
        maxWidth: 50,
        formatter: customEnableButtonFormatter,
        onCellClick: (e, args) => {
          this.toggleCompletedProperty(args && args.dataContext);
        }
      },

      {
        id: 'patient_id',
        name: 'ID Пациента',
        field: 'patient_id',
        filterable: true,
        sortable: true,
        minWidth: 80,
        maxWidth: 80,
        type: FieldType.string,
        filter: {
          model: CustomInputFilter, // create a new instance to make each Filter independent from each other
          enableTrimWhiteSpace: true // or use global "enableFilterTrimWhiteSpace" to trim on all Filters
        }
      },
      {
        id: 'patient_fio', name: 'Фамилия И.О.', field: 'patient_fio', sortable: true, minWidth: 55, maxWidth: 200,
        type: FieldType.string, filterable: true, filter: {model: Filters.compoundInputText}
      },

      {
        id: 'status', name: 'Статус', field: 'status', sortable: true, minWidth: 55,
        type: FieldType.string, filterable: true, filter: {model: Filters.compoundInputText}
      },
      {
        id: 'investigation_name',
        name: 'Услуга (исследование)',
        field: 'investigation_name',
        sortable: true,
        minWidth: 55,
        type: FieldType.string,
        filterable: true,
        filter: {model: Filters.compoundInputText}
      },
      {
        id: 'tape', name: ' ', field: 'tape', sortable: true, minWidth: 55,
        type: FieldType.string, filterable: true, filter: {model: Filters.compoundInputText}
      },
      {
        id: 'deviation', name: 'Отклонение', field: 'deviation', sortable: true, minWidth: 55,
        type: FieldType.string, filterable: true, filter: {model: Filters.compoundInputText}
      },
      {
        id: 'bar_code', name: 'Штрихкод', field: 'bar_code', sortable: true, minWidth: 55,
        type: FieldType.string, filterable: true, filter: {model: Filters.compoundInputText}
      },
      {
        id: 'bcp_name', name: 'Пункт забора', field: 'bcp_name', sortable: true, minWidth: 55,
        type: FieldType.string, filterable: true, filter: {model: Filters.compoundInputText}
      },
      {
        id: 'date_direction', name: 'Дата направления', field: 'date_direction', sortable: true, minWidth: 55,
        type: FieldType.string, filterable: true, filter: {model: Filters.compoundInputText}
      },
    ];
  }

}


const customEnableButtonFormatter: Formatter<MainDataView> = (_row: number, _cell: number, value: any) => {
  return `<span style="margin-left: 5px">
      <button class="btn btn-xs btn-default">
        <i class="fa ${value ? 'fa-check-circle' : 'fa-circle-thin'} fa-lg" style="color: ${value ? 'black' : 'lavender'}"></i>
      </button>
    </span>`;
};
