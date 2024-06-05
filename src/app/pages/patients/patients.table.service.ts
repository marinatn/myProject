import {TableServiceInterface} from "../../interfaces/tableServiceInterface";
import {Column, FieldType, Filters, Formatter,} from "angular-slickgrid";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {Injectable} from "@angular/core";
import {AlertController} from "@ionic/angular";
import {BaseTableService} from "../../modules/table/services/base.table.service";
import {VocabularyService} from "src/app/helpers/vocabulary";

@Injectable({providedIn: 'root'})
export class PatientsTableService extends BaseTableService  implements TableServiceInterface {
    public risks: any[] = [];
    public override item: any = {
      id: -1,
      fio: '',
      bith_date: '1970-01-01',
      snils_code: '',
      police_code: '',
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
      let str = '';
      JSON.parse(value).forEach((k:string) => {
        let risk = this.risks.find((risk) => {
          let res = risk.value === k;
          return res
        })
        str = str+risk.text + '; ';
      })

      return str;
      // return this.risks[value] ? this.risks[value].name || 'Категория риска не определена':value;
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
        name: 'ФИОs',
        field: 'fio',
        sortable: true,
        minWidth: 350,
        maxWidth: 500,
        type: FieldType.string,
        filterable: true,
        filter: {model: Filters.compoundInputText}
      },

      {
        id: 3,
        name: 'СНИЛС',
        field: 'snils_code',
        sortable: true,
        minWidth: 150,
        maxWidth: 150,
        type: FieldType.string,
        filterable: true,
        filter: {model: Filters.compoundInputText}
      },
      {
        id: 4,
        name: 'police_code',
        field: 'police_code',
        sortable: true,
        minWidth: 150,
        maxWidth: 150,
        type: FieldType.string,
        filterable: true,
        filter: {model: Filters.compoundInputText}
      },

      {
        id: 5,
        name: 'Группа риска',
        field: 'risks',
        sortable: true,
        minWidth: 300,
        maxWidth: 350,
        type: FieldType.string,
        filterable: true,
        formatter: this.riskIdToValueFormatter,
        filter: {model: Filters.compoundInputText}
      },

    ];

    public addPatient(itemUrl: string = '') {
      const data = Object.assign({...this.item}, {
        "snils_code": this.item.snils_code.toString(),
        "police_code": this.item.police_code.toString(),
        "risks": JSON.stringify([...this.item.risks])
      });
      this.addItem({
        data: data,
        refresh: true
      }, itemUrl);
    }

}