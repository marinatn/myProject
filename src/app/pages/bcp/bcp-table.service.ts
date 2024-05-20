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
import {BaseTableService} from "../../modules/table/services/base.table.service";


export interface BcpDataView {
  id: number,
  code: string,
  name: string,
  tests: any
}

@Injectable({providedIn: 'root'})
export class BcpTableService extends BaseTableService implements TableServiceInterface {
  constructor(
    override http: HttpClient,
    protected override translate: TranslateService,
    protected override alertController: AlertController) {
    super(http, translate, alertController);
  }
  protected override _selectedItem: BcpDataView | null = null;
  override get selectedItem(): BcpDataView | null {
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
