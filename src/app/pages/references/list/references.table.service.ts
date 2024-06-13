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
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class ReferencesTableService extends BaseTableService implements TableServiceInterface {
  public availableRefs: any[] = [];

  fetchRefs(): Observable<any> {
    return new Observable((observer) => {
      if (this.availableRefs.length > 0) {
        return observer.next(this.availableRefs);
      } else {
        return this.http.get('http://localhost:8000/api/references').subscribe((risks: any) => {
          this.availableRefs = risks;
          observer.next(risks);
        })
      }
    })
  }

  getRefsByIds(risks: any[]) {
    return risks.map((i: number) => {
      return this.availableRefs.find((risk: { id: number; }) => {
        return risk.id === i
      });
    })
  }

  formatData(data: string[]) {
    if (data.length === 1) {
      const risk = this.availableRefs.find((risk: { id: string; name: string }) => risk.id === data[0]);
      return risk.name;
    }

    return `${data.length} реф. значений`;
  }

  refIdToValueFormatter: Formatter<any> = (_row, _cell, value) => {
    let str = '';
    JSON.parse(value).forEach((k: number) => {
      let risk = this.availableRefs.find((risk: { id: number; name:string }) => {
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
      maxWidth: 30,
      type: FieldType.number,
    },
    {
      id: 1,
      name: 'Наименование набора',
      field: 'name',
      sortable: true,
      minWidth: 150,
      type: FieldType.string,
      filterable: true,
      filter: {model: Filters.compoundInputText}
    },

    {
      id: 2,
      name: 'min.',
      field: 'min',
      sortable: true,
      maxWidth: 50,
      type: FieldType.float,
    },
    {
      id: 3,
      name: 'max.',
      field: 'max',
      sortable: true,
      maxWidth: 30,
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
}

