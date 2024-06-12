import {TableServiceInterface} from "../../../interfaces/tableServiceInterface";
import {Column, FieldType, Filters,} from "angular-slickgrid";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {Injectable} from "@angular/core";
import {AlertController} from "@ionic/angular";
import {BaseTableService} from "../../../modules/table/services/base.table.service";
import {VocabularyService} from "src/app/helpers/vocabulary";
import {Router} from "@angular/router";
import {APP_ROUTES} from "../../../app-routing.module";

@Injectable({providedIn: 'root'})
export class RisksTableService extends BaseTableService implements TableServiceInterface {
  constructor(override http: HttpClient, protected override translate: TranslateService, protected override alertController: AlertController, protected vocabulary: VocabularyService, private router: Router) {
    super(http, translate, alertController);
  }

  override getTableColumns = (): Column[] => [
    {
      id: 0,
      name: '№',
      field: 'id',
      sortable: true,
      width: 30,
      maxWidth: 30,
      type: FieldType.number
    },
    {
      id: 1,
      name: 'Название риска',
      field: 'name',
      sortable: true,
      type: FieldType.string,
      filterable: true,
      filter: {model: Filters.compoundInputText}
    },
  ];

  override async onRowClick(item: any) {
    await this.router.navigate([APP_ROUTES.risk_page], {
      queryParams: {
        'id': item.id
      }
    });
  }
}
