import {TableServiceInterface} from "../../../interfaces/tableServiceInterface";
import {Column, FieldType, Filters, Formatter,} from "angular-slickgrid";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {Injectable} from "@angular/core";
import {AlertController} from "@ionic/angular";
import {BaseTableService} from "../../../modules/table/services/base.table.service";
import {Router} from "@angular/router";
import {TestsTableService} from "../../tests/list/tests.table.service";
import {APP_ROUTES} from "../../../app-routing.module";
import {Observable} from "rxjs";
import {APP_API_URL} from "../../../app.component";

@Injectable({providedIn: 'root'})
export class ResearchesTableService extends BaseTableService implements TableServiceInterface {
  public availableResearches: any[] = [];

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

  fetchResearches(): Observable<any> {
    return new Observable((observer) => {
      if (this.availableResearches.length > 0) {
        observer.next(this.availableResearches);
        return observer.complete()
      } else {
        return this.http.get(APP_API_URL + '/researches').subscribe((researches: any) => {
          this.availableResearches = researches;
          observer.next(researches);
          return observer.complete()
        })
      }
    })
  }

  getRefsByIds(risks: any[]) {
    return risks.map((i: number) => {
      return this.availableResearches.find((risk: { id: number; }) => {
        return risk.id === i
      });
    })
  }

  formatData(data: string[]) {
    if (data.length === 1) {
      const risk = this.availableResearches.find((risk: { id: string; name: string }) => risk.id === data[0]);
      return risk.name;
    }

    return `${data.length} реф. значений`;
  }

  researchIdToValueFormatter: Formatter<any> = (_row, _cell, value) => {
    let str = '';
    JSON.parse(value).forEach((k: number) => {
      let risk = this.availableResearches.find((risk: { id: number; name: string }) => {
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
  ];

  override async onRowClick(item: any) {
    await this.router.navigate([APP_ROUTES.research_page], {
      queryParams: {
        'id': item.id
      }
    });
  }
}
