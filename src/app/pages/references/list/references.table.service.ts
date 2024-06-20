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
import {APP_API_URL} from "../../../app.component";

@Injectable({providedIn: 'root'})
export class ReferencesTableService extends BaseTableService implements TableServiceInterface {
  public availableRefs: any[] = [];

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

  fetchRefs(): Observable<any> {
    return new Observable((observer) => {
      if (this.availableRefs.length > 0) {
        observer.next(this.availableRefs);
        return observer.complete();
      } else {
        return this.http.get(APP_API_URL + '/references').subscribe((refs: any) => {
          refs = refs.map((ref: any) => {
            ref.name = ref.name + ' ('+this.sexToValue(null, null, ref.sex)+')';
            return ref;
          })
          this.availableRefs = refs;
          observer.next(refs);
          return observer.complete();
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
      const ref = this.availableRefs.find((ref: { id: string; name: string }) => ref.id === data[0]);
      return ref.name;
    }

    return `${data.length} реф. значений`;
  }

  refIdToValueFormatter: Formatter<any> = (_row, _cell, value) => {
    let str = '';
    JSON.parse(value).forEach((k: number) => {
      let risk = this.availableRefs.find((risk: { id: number; name: string }) => {
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

  private sexToValue = (_row:any, _cell:any, value:any) => {
    return value === 'male'?'Мужской':value === 'female'?'Женский':'не определен';
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
      type: FieldType.string,
      filterable: true,
      filter: {model: Filters.compoundInputText}
    },

    {
      id: 2,
      name: 'min.',
      field: 'min',
      sortable: true,
      maxWidth: 80,
      type: FieldType.float,
    },
    {
      id: 3,
      name: 'max.',
      field: 'max',
      sortable: true,
      maxWidth: 80,
      type: FieldType.float,
    },
    {
      id: 4,
      name: 'Ед. изм.',
      field: 'unit',
      sortable: true,
      maxWidth: 60,
      type: FieldType.string,
    },
    {
      id: 5,
      name: 'Пол',
      field: 'sex',
      sortable: true,
      maxWidth: 100,
      type: FieldType.string,
      formatter: this.sexToValue
    },
    {
      id: 6,
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

