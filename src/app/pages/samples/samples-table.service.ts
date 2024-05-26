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




export interface SamplesDataView {
  id: number,
  code: string, //from table research
  name: string,
  biomaterial: string,
  container: string,
}
@Injectable({providedIn: 'root'})
export class SamplesTableService extends BaseTableService implements TableServiceInterface {
  constructor(
    override http: HttpClient,
    protected override translate: TranslateService,
    protected override alertController: AlertController) {
    super(http, translate, alertController);
  }
  protected override _selectedItem: SamplesDataView | null = null;
  override get selectedItem(): SamplesDataView | null {
    return this._selectedItem;
  }

  override getTableColumns = (): Column[] => [

    {
      id: 0,
      name: 'Идентификатор',
      field: 'id',
      sortable: true,
      minWidth: 100,
      maxWidth: 150,
      type: FieldType.number,
      filterable: true,
      filter: {model: Filters.compoundInputText}
    },

    {
      id: 1,
      name: 'Код исследования',
      field: 'code',
      sortable: true,
      minWidth: 350,
      maxWidth: 500,
      type: FieldType.number,
      filterable: true,
      filter: {model: Filters.compoundInputText}
    },

    {
      id: 2,
      name: 'Наименование исследования',
      field: 'name',
      sortable: true,
      minWidth: 350,
      maxWidth: 500,
      type: FieldType.string,
      filterable: true,
      filter: {model: Filters.compoundInputText}
    },

    {
      id: 3,
      name: 'Биоматериал',
      field: 'biomaterial',
      sortable: true,
      minWidth: 150,
      maxWidth: 150,
      type: FieldType.number,
      filterable: true,
      filter: {model: Filters.compoundInputText}
    },

    {
      id: 3,
      name: 'Тип контейнера',
      field: 'container',
      sortable: true,
      minWidth: 150,
      maxWidth: 150,
      type: FieldType.number,
      filterable: true,
      filter: {model: Filters.compoundInputText}
    },

  ];


}


const customEnableButtonFormatter: Formatter<SamplesDataView> = (_row: number, _cell: number, value: any) => {
  return `<span style="margin-left: 5px">
      <button class="btn btn-xs btn-default">
        <i class="fa ${value ? 'fa-check-circle' : 'fa-circle-thin'} fa-lg" style="color: ${value ? 'black' : 'lavender'}"></i>
      </button>
    </span>`;
};
