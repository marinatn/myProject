import {TableServiceInterface} from "../../../interfaces/tableServiceInterface";
import {Column, FieldType, Filters, Formatter,} from "angular-slickgrid";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {Injectable} from "@angular/core";
import {AlertController} from "@ionic/angular";
import {BaseTableService} from "../../../modules/table/services/base.table.service";
import {VocabularyService} from "src/app/helpers/vocabulary";
import {Router} from "@angular/router";
import {APP_ROUTES} from "../../../app-routing.module";

@Injectable({providedIn: 'root'})
export class PatientsTableService extends BaseTableService implements TableServiceInterface {
  private availableRisks: any = [];

  constructor(override http: HttpClient, protected override translate: TranslateService, protected override alertController: AlertController, protected vocabulary: VocabularyService, private router: Router) {
    super(http, translate, alertController);
    this.availableRisks = this.vocabulary.getRiskCategories();
  }

  override getTableColumns = (): Column[] => [{
    id: 0, name: 'ID', field: 'id', sortable: true, minWidth: 100, maxWidth: 150, type: FieldType.number, // filterable: true,
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
    }, {
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

  override async onRowClick(patient: any) {
    await this.router.navigate([APP_ROUTES.patient_page], {
      queryParams: {
        'id': patient.id
      }
    });
  }

  protected riskIdToValueFormatter: Formatter<any> = (_row, _cell, value) => {
    let str = '';
    JSON.parse(value).forEach((k: string) => {
      let risk = this.availableRisks.find((risk: { value: string; }) => {
        let res = risk.value === k;
        return res
      })
      str = str + risk.text + '; ';
    })

    return str;
    // return this.risks[value] ? this.risks[value].name || 'Категория риска не определена':value;
  };
}
