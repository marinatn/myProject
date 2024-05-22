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
import {BaseTableService, ScheduleDataView} from "../../modules/table/services/base.table.service";
import {map} from "rxjs/operators";
import {Observable, Observer, Subscription} from "rxjs";



export interface TimingDataView {
  id: number,
  code: string,
  name: string,
  refer: string
}
@Injectable({providedIn: 'root'})
export class TimingTableService extends BaseTableService implements TableServiceInterface {
  constructor(
    override http: HttpClient,
    protected override translate: TranslateService,
    protected override alertController: AlertController) {
    super(http, translate, alertController);
  }
  protected override _selectedItem: TimingDataView | null = null;
  override get selectedItem(): TimingDataView | null {
    return this._selectedItem;
  }

  override getTableColumns = (): Column[] => [

    {
      id: 1,
      name: 'Код теста',
      field: 'code',
      sortable: true,
      minWidth: 55,
      maxWidth: 75,
      type: FieldType.number,
      filterable: true,
      filter: {model: Filters.compoundInputText}
    },

    {
      id: 2,
      name: 'Наименование теста',
      field: 'name',
      sortable: true,
      minWidth: 55,
      maxWidth: 200,
      type: FieldType.number,
      filterable: true,
      filter: {model: Filters.compoundInputText}
    },

    {
      id: 1,
      name: 'Референсные значения',
      field: 'refer',
      sortable: true,
      minWidth: 55,
      maxWidth: 200,
      type: FieldType.number,
      filterable: true,
      filter: {model: Filters.compoundInputText}
    },
  ];


}


const customEnableButtonFormatter: Formatter<TimingDataView> = (_row: number, _cell: number, value: any) => {
  return `<span style="margin-left: 5px">
      <button class="btn btn-xs btn-default">
        <i class="fa ${value ? 'fa-check-circle' : 'fa-circle-thin'} fa-lg" style="color: ${value ? 'black' : 'lavender'}"></i>
      </button>
    </span>`;
};
