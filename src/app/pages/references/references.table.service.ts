import {TableServiceInterface} from "../../interfaces/tableServiceInterface";
import {Column, FieldType, Filters, Formatter,} from "angular-slickgrid";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {Injectable} from "@angular/core";
import {AlertController} from "@ionic/angular";
import {BaseTableService} from "../../modules/table/services/base.table.service";
import {VocabularyService} from "src/app/helpers/vocabulary";

@Injectable({providedIn: 'root'})
export class ReferencesTableService extends BaseTableService  implements TableServiceInterface {
    public risks: any[] = [];
    public override item: any = {
      id: -1,
      name: '',
      min: 0,
      max: '',
      risks: []

    };


    constructor(
      override http: HttpClient,
      protected override translate: TranslateService,
      protected override alertController: AlertController,
      protected vocabulary: VocabularyService) {
      super(http, translate, alertController);
      this.risks = this.vocabulary.getRiskCategories();
    }

    protected riskIdToValueFormatter: Formatter<any> = (_row, _cell, value) => {
      return this.risks[value] ? this.risks[value].name || 'Категория риска не определена':value;
    };

    override getTableColumns = (): Column[] => [

      {
        id: 0,
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
        name: 'Наименование набора',
        field: 'name',
        sortable: true,
        minWidth: 350,
        maxWidth: 350,
        type: FieldType.string,
        filterable: true,
        filter: {model: Filters.compoundInputText}
      },

      {
        id: 2,
        name: 'Минимальное значение',
        field: 'min',
        sortable: true,
        minWidth: 350,
        maxWidth: 350,
        // formatter: this.postIdToValueFormatter
        // type: FieldType.string,
        // filterable: true,
        // filter: {model: Filters.compoundInputText}
      },

      {
        id: 3,
        name: 'Максимальное значение',
        field: 'max',
        sortable: true,
        minWidth: 300,
        maxWidth: 350,
        type: FieldType.string,
        filterable: true,
        filter: {model: Filters.compoundInputText}
      },

      {
        id: 4,
        name: 'Группа риска',
        field: 'risks',
        sortable: true,
        minWidth: 300,
        maxWidth: 350,
        type: FieldType.string,
        filterable: true,
        filter: {model: Filters.compoundInputText}
      },

    ];
  }
