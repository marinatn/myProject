import {TableServiceInterface} from "../../interfaces/tableServiceInterface";
import {Column, FieldType, Formatter,} from "angular-slickgrid";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {Injectable} from "@angular/core";
import {AlertController} from "@ionic/angular";
import {BaseTableService} from "../../modules/table/services/base.table.service";
import {VocabularyService} from "src/app/helpers/vocabulary";

@Injectable({providedIn: 'root'})
export class ResearchesTableService extends BaseTableService  implements TableServiceInterface {
    public tests: any[] = [];
    public override item: any = {
      tests: []
    };


    constructor(
      override http: HttpClient,
      protected override translate: TranslateService,
      protected override alertController: AlertController,
      protected vocabulary: VocabularyService) {
      super(http, translate, alertController);
      this.tests = this.vocabulary.getTests();
    }

    protected riskIdToValueFormatter: Formatter<any> = (_row, _cell, value) => {
      return this.tests[value] ? this.tests[value].name || 'Категория риска не определена':value;
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
        name: 'Идентификатор',
        field: 'id',
        sortable: true,
        minWidth: 150,
        maxWidth: 150,
        type: FieldType.number,
        // filterable: true,
        // filter: {model: Filters.compoundInputText}
      },

      {
        id: 1,
        name: 'Исследование',
        field: 'id',
        sortable: true,
        minWidth: 150,
        maxWidth: 150,
        type: FieldType.number,
        // filterable: true,
        // filter: {model: Filters.compoundInputText}
      },

      {
        id: 1,
        name: 'Состав исследования',
        field: 'tests',
        sortable: true,
        minWidth: 150,
        maxWidth: 150,
        type: FieldType.number,
        // filterable: true,
        // filter: {model: Filters.compoundInputText}
      },

      {
        id: 1,
        name: 'Штрихкод пробы',
        field: 'barCode',
        sortable: true,
        minWidth: 200,
        maxWidth: 200,
        type: FieldType.number,
        // filterable: true,
        // filter: {model: Filters.compoundInputText}
      },
]
}
