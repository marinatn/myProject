import {TableServiceInterface} from "../../interfaces/tableServiceInterface";
import {
  Column,
  FieldType,
  Filters,
  Formatter
} from "angular-slickgrid";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {Injectable} from "@angular/core";
import {AlertController} from "@ionic/angular";
import {BaseTableService} from "../../modules/table/services/base.table.service";

export interface AnalizatorsDataView{
  id: number,
  name: string,
  short_name: string,
  type_interaction: string, //data is taken from the table type_interaction
  type_equipment: string, //data is taken from the table type_equipment
}
@Injectable({providedIn: 'root'})
export class AnalizatorsTableService extends BaseTableService implements TableServiceInterface {
  constructor(
    override http: HttpClient,
    protected override translate: TranslateService,
    protected override alertController: AlertController) {
    super(http, translate, alertController);
  }
  protected override _selectedItem: AnalizatorsDataView | null = null;
  override get selectedItem(): AnalizatorsDataView | null {
    return this._selectedItem;
  }

  override getTableColumns = (): Column[] => [

    {
      id: 0,
      name: 'Идентификатор',
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
      name: 'Наименование анализатора',
      field: 'name',
      sortable: true,
      minWidth: 55,
      maxWidth: 200,
      type: FieldType.number,
      filterable: true,
      filter: {model: Filters.compoundInputText}
    },

    {
      id: 2,
      name: 'Тип оборудования',
      field: 'type_interaction',
      sortable: true,
      minWidth: 55,
      maxWidth: 200,
      type: FieldType.number,
      filterable: true,
      filter: {model: Filters.compoundInputText}
    },

    {
      id: 3,
      name: 'Тип взаимодействия',
      field: 'type_equipment',
      sortable: true,
      minWidth: 55,
      maxWidth: 200,
      type: FieldType.number,
      filterable: true,
      filter: {model: Filters.compoundInputText}
    },
  ];


}


const customEnableButtonFormatter: Formatter<AnalizatorsDataView> = (_row: number, _cell: number, value: any) => {
  return `<span style="margin-left: 5px">
      <button class="btn btn-xs btn-default">
        <i class="fa ${value ? 'fa-check-circle' : 'fa-circle-thin'} fa-lg" style="color: ${value ? 'black' : 'lavender'}"></i>
      </button>
    </span>`;
};
