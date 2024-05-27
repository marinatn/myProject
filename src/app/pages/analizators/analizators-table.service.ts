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
import {VocabularyService} from "src/app/helpers/vocabulary";

export interface AnalizatorsDataView{
  id: number,
  name: string,
  short_name: string,
  type_interaction: string, //data is taken from the table type_interaction
  type_equipment: string, //data is taken from the table type_equipment
}
@Injectable({providedIn: 'root'})
export class AnalizatorsTableService extends BaseTableService implements TableServiceInterface {
  override item:any = {
    id: -1,
    name: '',
    short_name: '',
    type_interaction: 0,
    type_equipment: 0
  };
  type_interactions: any[] = [];
  type_equipments: any[] = [];
  constructor(
    override http: HttpClient,
    protected override translate: TranslateService,
    protected override alertController: AlertController,
    protected vocabulary: VocabularyService) {
    super(http, translate, alertController);
    this.type_interactions = this.vocabulary.getTypesInteraction();
    this.type_equipments = this.vocabulary.getTypeEquipments();
  }
  protected override _selectedItem: AnalizatorsDataView | null = null;
  protected interactionIdToValueFormatter: Formatter<any> = (_row, _cell, value) => {
    return this.type_interactions[value] ? this.type_interactions[value].name || 'Схема взаимодействия не определена':value;
  };
  protected equpmentIdToValueFormatter: Formatter<any> = (_row, _cell, value) => {
    return this.type_equipments[value] ? this.type_equipments[value].name || 'Оборудование не определена':value;
  };
  override get selectedItem(): AnalizatorsDataView | null {
    return this._selectedItem;
  }

  override getTableColumns = (): Column[] => [

    {
      id: 0,
      name: 'Идентификатор',
      field: 'id',
      // sortable: true,
      minWidth: 55,
      maxWidth: 200,
      // type: FieldType.number,
      // filterable: true,
      // filter: {model: Filters.compoundInputText}
    },

    {
      id: 1,
      name: 'Наименование анализатора',
      field: 'name',
      sortable: true,
      minWidth: 55,
      maxWidth: 200,
      type: FieldType.string,
      filterable: true,
      filter: {model: Filters.compoundInputText}
    },

    {
      id: 2,
      name: 'Тип оборудования',
      field: 'type_equipment',
      // sortable: true,
      minWidth: 55,
      maxWidth: 200,
      formatter: this.equpmentIdToValueFormatter,
      type: FieldType.string,
      // filterable: true,
      // filter: {model: Filters.compoundInputText}
    },

    {
      id: 3,
      name: 'Тип взаимодействия',
      field: 'type_interaction',
      // sortable: true,
      minWidth: 55,
      maxWidth: 200,
      formatter: this.interactionIdToValueFormatter,
      type: FieldType.string,
      // filterable: true,
      // filter: {model: Filters.compoundInputText}
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
