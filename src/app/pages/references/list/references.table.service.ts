import {Column, FieldType, Filters, Formatter,} from "angular-slickgrid";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {Injectable} from "@angular/core";
import {AlertController} from "@ionic/angular";
import {VocabularyService} from "src/app/helpers/vocabulary";
import {Router} from "@angular/router";
import {BaseTableService} from "../../../modules/table/services/base.table.service";
import {TableServiceInterface} from "../../../interfaces/tableServiceInterface";
import {APP_ROUTES} from "../../../app-routing.module";
import {RisksTableService} from "../../risks/list/risks.table.service";

@Injectable({providedIn: 'root'})
export class ReferencesTableService extends BaseTableService implements TableServiceInterface {
  public availableRisks: any[] = [];


  constructor(
    protected override http: HttpClient,
    protected override translate: TranslateService,
    protected override alertController: AlertController,
    protected vocabulary: VocabularyService,
    private router: Router,
    private risksService: RisksTableService
  ) {
    super(http, translate, alertController);
  }

  override getTableColumns = (): Column[] => [
    {
      id: 0,
      name: 'Идентификатор',
      field: 'id',
      sortable: true,
      width: 30,
      type: FieldType.number,
    },
    {
      id: 1,
      name: 'Наименование набора',
      field: 'name',
      sortable: true,
      width: 150,
      type: FieldType.string,
      filterable: true,
      filter: {model: Filters.compoundInputText}
    },

    {
      id: 2,
      name: 'min.',
      field: 'min',
      sortable: true,
      width: 50,
      type: FieldType.float,
    },
    {
      id: 3,
      name: 'max.',
      field: 'max',
      sortable: true,
      width: 50,
      type: FieldType.float,
    },
    {
      id: 5,
      name: 'Группа риска',
      field: 'risks',
      type: FieldType.string,
      formatter: this.risksService.riskIdToValueFormatter,
    },

  ];

  override async onRowClick(item: any) {
    await this.router.navigate([APP_ROUTES.reference_page], {
      queryParams: {
        'id': item.id
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

