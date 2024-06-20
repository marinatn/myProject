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
import {RisksTableService} from "../../risks/list/risks.table.service";
import {Observable} from "rxjs";
import {APP_API_URL} from "../../../app.component";

@Injectable({providedIn: 'root'})
export class PatientsTableService extends BaseTableService implements TableServiceInterface {
  public availablePatients: any = [];

  constructor(
    override http: HttpClient,
    protected override translate: TranslateService,
    protected override alertController: AlertController,
    protected vocabulary: VocabularyService,
    private router: Router,
    private risksService: RisksTableService
  ) {
    super(http, translate, alertController);
  }

  fetchPatients(): Observable<any> {
    return new Observable((observer) => {
      if (this.availablePatients.length > 0) {
        observer.next(this.availablePatients);
        observer.complete();
        return observer;
      } else {
        return this.http.get(APP_API_URL + '/patients').subscribe((patients: any) => {
          this.availablePatients = patients;
          observer.next(patients);
          observer.complete();
          return observer;
        })
      }
    })
  }

  getPatientsByIds(risks: any[]) {
    return risks.map((i: number) => {
      return this.availablePatients.find((risk: { id: number; }) => {
        return risk.id === i
      });
    })
  }

  formatData(data: string[]) {
    if (data.length === 1) {
      const risk = this.availablePatients.find((risk: { id: string; fio: string }) => risk.id === data[0]);
      return risk.fio;
    }

    return `${data.length} реф. значений`;
  }

  patientIdToValueFormatter: Formatter<any> = (_row, _cell, value) => {
    let str = '';
    let patient = this.availablePatients.find((patient: { id: number; fio: string }) => {
      return patient.id === value
    })
    if (patient) {
      str = str + patient.fio + '; ';
    } else {
      str = value + ';';
    }

    return str;
    // return this.risks[value] ? this.risks[value].name || 'Категория риска не определена':value;
  };

  override getTableColumns = (): Column[] => [{
    id: 0, name: 'ID', field: 'id', sortable: true, maxWidth: 30, type: FieldType.number, // filterable: true,
    // filter: {model: Filters.compoundInputText}
  },

    {
      id: 1,
      name: 'ФИОs',
      field: 'fio',
      sortable: true,
      maxWidth: 200,
      type: FieldType.string,
      filterable: true,
      filter: {model: Filters.compoundInputText}
    },

    {
      id: 3,
      name: 'СНИЛС',
      field: 'snils_code',
      maxWidth: 150,
      type: FieldType.string,
      filterable: true,
      filter: {model: Filters.compoundInputText}
    }, {
      id: 4,
      name: 'Полис',
      field: 'police_code',
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
      type: FieldType.string,
      filterable: true,
      formatter: this.risksService.riskIdToValueFormatter,
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


}
