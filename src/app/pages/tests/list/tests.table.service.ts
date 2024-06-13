import {Column, FieldType, Filters,} from "angular-slickgrid";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {Injectable} from "@angular/core";
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
import {BaseTableService} from "../../../modules/table/services/base.table.service";
import {TableServiceInterface} from "../../../interfaces/tableServiceInterface";
import {APP_ROUTES} from "../../../app-routing.module";
import {ReferencesTableService} from "../../references/list/references.table.service";

@Injectable({providedIn: 'root'})
export class TestsTableService extends BaseTableService implements TableServiceInterface {
  public availableRefs: any[] = [];


  constructor(
    protected override http: HttpClient,
    protected override translate: TranslateService,
    protected override alertController: AlertController,
    private router: Router,
    private refsService: ReferencesTableService
  ) {
    super(http, translate, alertController);
  }

  override getTableColumns = (): Column[] => [
    {
      id: 1,
      name: 'Код теста',
      field: 'code',
      sortable: true,
      width: 80,
      type: FieldType.number,
      filterable: true,
      filter: {model: Filters.compoundInputText}
    },

    {
      id: 2,
      name: 'Наименование теста',
      field: 'name',
      sortable: true,
      minWidth: 100,
      type: FieldType.string,
      filterable: true,
      filter: {model: Filters.compoundInputText}
    },
    {
      id: 5,
      name: 'Референсные значения',
      field: 'refs',
      type: FieldType.string,
      formatter: this.refsService.refIdToValueFormatter,
    },

  ];

  override async onRowClick(item: any) {
    await this.router.navigate([APP_ROUTES.test_page], {
      queryParams: {
        'id': item.id
      }
    });
  }
}

