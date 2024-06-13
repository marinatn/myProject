import {TableServiceInterface} from "../../../interfaces/tableServiceInterface";
import {Column, FieldType, Filters,} from "angular-slickgrid";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {Injectable} from "@angular/core";
import {AlertController} from "@ionic/angular";
import {BaseTableService} from "../../../modules/table/services/base.table.service";
import {Router} from "@angular/router";
import {TestsTableService} from "../../tests/list/tests.table.service";
import {APP_ROUTES} from "../../../app-routing.module";

@Injectable({providedIn: 'root'})
export class ResearchesTableService extends BaseTableService implements TableServiceInterface {
  public availableTests: any[] = [];
  public override item: any = {
    tests: []
  };


  constructor(
    protected override http: HttpClient,
    protected override translate: TranslateService,
    protected override alertController: AlertController,
    private router: Router,
    private testsService: TestsTableService
  ) {
    super(http, translate, alertController);
  }

  override getTableColumns = (): Column[] => [
    {
      id: 0,
      name: 'ID',
      field: 'id',
      sortable: true,
      width: 30,
      type: FieldType.number,
    },
    {
      id: 1,
      name: 'Код исследования',
      field: 'code',
      sortable: true,
      width: 80,
      type: FieldType.number,
      filterable: true,
      filter: {model: Filters.compoundInputText}
    },
    {
      id: 2,
      name: 'Наименование исследования',
      field: 'name',
      sortable: true,
      minWidth: 100,
      type: FieldType.string,
      filterable: true,
      filter: {model: Filters.compoundInputText}
    },
    {
      id: 1,
      name: 'Состав исследования',
      field: 'tests',
      sortable: true,
      minWidth: 50,
      type: FieldType.string,
      formatter: this.testsService.testIdToValueFormatter,
    },

    // { !!!
    //   id: 1,
    //   name: 'Штрихкод пробы',
    //   field: 'barCode',
    //   sortable: true,
    //   minWidth: 200,
    //   maxWidth: 200,
    //   type: FieldType.string,
    //   // filterable: true,
    //   // filter: {model: Filters.compoundInputText}
    // },
  ];

  override async onRowClick(item: any) {
    await this.router.navigate([APP_ROUTES.research_page], {
      queryParams: {
        'id': item.id
      }
    });
  }
}
