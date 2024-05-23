import {TableServiceInterface} from "../../interfaces/tableServiceInterface";
import {
  Column,
  FieldType,
  Filters,
  Formatter,
} from "angular-slickgrid";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {Injectable} from "@angular/core";
import {AlertController} from "@ionic/angular";
import {BaseTableService} from "../../modules/table/services/base.table.service";




export interface TypeInteractionDataView {
  id: number,
  name: string,
}
@Injectable({providedIn: 'root'})
export class TypeInteractionTableService extends BaseTableService implements TableServiceInterface {
  constructor(
    override http: HttpClient,
    protected override translate: TranslateService,
    protected override alertController: AlertController) {
    super(http, translate, alertController);
  }
  protected override _selectedItem: TypeInteractionDataView | null = null;
  override get selectedItem(): TypeInteractionDataView | null {
    return this._selectedItem;
  }

  override getTableColumns = (): Column[] => [

    {
      id: 0,
      name: 'Идентификатор',
      field: 'ic',
      sortable: true,
      minWidth: 150,
      maxWidth: 250,
      type: FieldType.number,
      filterable: true,
      filter: {model: Filters.compoundInputText}
    },

    {
      id: 1,
      name: 'Тип взаимодейсвтия анализатора',
      field: 'name',
      sortable: true,
      minWidth: 250,
      maxWidth: 400,
      type: FieldType.number,
      filterable: true,
      filter: {model: Filters.compoundInputText}
    },

  ];


}


const customEnableButtonFormatter: Formatter<TypeInteractionDataView> = (_row: number, _cell: number, value: any) => {
  return `<span style="margin-left: 5px">
      <button class="btn btn-xs btn-default">
        <i class="fa ${value ? 'fa-check-circle' : 'fa-circle-thin'} fa-lg" style="color: ${value ? 'black' : 'lavender'}"></i>
      </button>
    </span>`;
};
