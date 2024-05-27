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
import {VocabularyService} from "src/app/helpers/vocabulary";

export interface DoctorsDataView {
  id: number,
  fio: string,
  post: string,
  snils: string,
}
@Injectable({providedIn: 'root'})
export class DoctorsTableService extends BaseTableService implements TableServiceInterface {
  public posts: any[] = [];
  public override item: any = {
    id: -1,
    fio: '',
    post: 0,
    snils: ''

  };


  
  constructor(
    override http: HttpClient,
    protected override translate: TranslateService,
    protected override alertController: AlertController,
    protected vocabulary: VocabularyService) {
    super(http, translate, alertController);
    this.posts = this.vocabulary.getPosts();
  }

  protected postIdToValueFormatter: Formatter<any> = (_row, _cell, value) => {
    return this.posts[value] ? this.posts[value].name || 'Должность не определена':value;
  };

  override getTableColumns = (): Column[] => [

    {
      id: 0,
      name: 'ID',
      field: 'id',
      sortable: true,
      minWidth: 100,
      maxWidth: 150,
      type: FieldType.number,
      // filterable: true,
      // filter: {model: Filters.compoundInputText}
    },

    {
      id: 1,
      name: 'ФИО специалиста',
      field: 'fio',
      sortable: true,
      minWidth: 350,
      maxWidth: 500,
      type: FieldType.string,
      filterable: true,
      filter: {model: Filters.compoundInputText}
    },

    {
      id: 2,
      name: 'Должность работника',
      field: 'post',
      sortable: true,
      minWidth: 350,
      maxWidth: 500,
      formatter: this.postIdToValueFormatter
      // type: FieldType.string,
      // filterable: true,
      // filter: {model: Filters.compoundInputText}
    },

    {
      id: 3,
      name: 'СНИЛС',
      field: 'snils',
      sortable: true,
      minWidth: 150,
      maxWidth: 150,
      type: FieldType.string,
      filterable: true,
      filter: {model: Filters.compoundInputText}
    },

  ];


}

