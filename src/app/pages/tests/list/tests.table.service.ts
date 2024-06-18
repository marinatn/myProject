import {Column, FieldType, Filters, Formatter,} from "angular-slickgrid";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {Injectable} from "@angular/core";
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
import {BaseTableService} from "../../../modules/table/services/base.table.service";
import {TableServiceInterface} from "../../../interfaces/tableServiceInterface";
import {APP_ROUTES} from "../../../app-routing.module";
import {ReferencesTableService} from "../../references/list/references.table.service";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class TestsTableService extends BaseTableService implements TableServiceInterface {
  public availableTests: any[] = [];

  fetchTests(): Observable<any> {
    return new Observable((observer) => {
      if (this.availableTests.length > 0) {
        return observer.next(this.availableTests);
      } else {
        return this.http.get('http://45.141.100.40/api/tests').subscribe((risks: any) => {
          this.availableTests = risks;
          observer.next(risks);
        })
      }
    })
  }

  getRefsByIds(risks: any[]) {
    return risks.map((i: number) => {
      return this.availableTests.find((risk: { id: number; }) => {
        return risk.id === i
      });
    })
  }

  formatData(data: string[]) {
    if (data.length === 1) {
      const risk = this.availableTests.find((risk: { id: string; name: string }) => risk.id === data[0]);
      return risk.name;
    }

    return `${data.length} реф. значений`;
  }

  testIdToValueFormatter: Formatter<any> = (_row, _cell, value) => {
    let str = '';
    JSON.parse(value).forEach((k: number) => {
      let risk = this.availableTests.find((risk: { id: number; name:string }) => {
        return risk.id === k
      })
      if (risk) {
        str = str + risk.name + '; ';
      } else {
        str = value + ';';
      }
    })

    return str;
    // return this.risks[value] ? this.risks[value].name || 'Категория риска не определена':value;
  };

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

