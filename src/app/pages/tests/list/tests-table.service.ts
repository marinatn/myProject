import {TableServiceInterface} from "../../../interfaces/tableServiceInterface";
import {Column, FieldType, Filters, Formatter} from "angular-slickgrid";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {Injectable} from "@angular/core";
import {AlertController} from "@ionic/angular";
import {BaseTableService} from "../../../modules/table/services/base.table.service";
import {VocabularyService} from "../../../helpers/vocabulary";


export interface TimingDataView {
  id: number,
  code: string,
  name: string,
  refer: string
}
@Injectable({providedIn: 'root'})
export class TestsTableService extends BaseTableService implements TableServiceInterface {
  references: any[] = [];
  constructor(
    override http: HttpClient,
    protected override translate: TranslateService,
    protected override alertController: AlertController,
    protected vocabularyService: VocabularyService) {
    super(http, translate, alertController);
    this.references = this.vocabularyService.getReferences();
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
      type: FieldType.string,
      filterable: true,
      filter: {model: Filters.compoundInputText}
    },

    {
      id: 1,
      name: 'Референсные значения',
      field: 'refer',
      // sortable: true,
      minWidth: 55,
      maxWidth: 200,
      // type: FieldType.number,
      // filterable: true,
      // filter: {model: Filters.compoundInputText}
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
