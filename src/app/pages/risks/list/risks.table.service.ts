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
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class RisksTableService extends BaseTableService implements TableServiceInterface {
  constructor(override http: HttpClient, protected override translate: TranslateService, protected override alertController: AlertController, protected vocabulary: VocabularyService, private router: Router) {
    super(http, translate, alertController);
  }

  availableRisks: any[] = [];

  fetchRisks(): Observable<any> {
    return new Observable((observer) => {
      if (this.availableRisks.length > 0) {
        observer.next(this.availableRisks);
        return observer.complete();
      } else {
        return this.http.get('http://45.141.100.40/api/risks').subscribe((risks: any) => {
          this.availableRisks = risks;
          observer.next(risks);
          observer.complete();
        })
      }
    })
  }

  getRisksByIds(risks: any[]) {
    return risks.map((i: number) => {
      return this.availableRisks.find((risk: { id: number; }) => {
        return risk.id === i
      });
    })
  }

  formatData(data: string[]) {
    if (data.length === 1) {
      const risk = this.availableRisks.find((risk: { id: string; name: string }) => risk.id === data[0]);
      return risk.name;
    }

    return `${data.length} группы риска для реф. значения`;
  }

  riskIdToValueFormatter: Formatter<any> = (_row, _cell, value) => {
    let str = '';
    JSON.parse(value).forEach((k: number) => {
      let risk = this.availableRisks.find((risk: { id: number; name:string }) => {
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
