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
import {ResearchesTableService} from "../../researches/list/researches.table.service";
import {PatientsTableService} from "../../patients/list/patients.table.service";
import {DoctorsTableService} from "../../doctors/list/doctors.table.service";

@Injectable({providedIn: 'root'})
export class OrdersTableService extends BaseTableService implements TableServiceInterface {

  constructor(
    protected override http: HttpClient,
    protected override translate: TranslateService,
    protected override alertController: AlertController,
    private router: Router,
    private researchService: ResearchesTableService,
    private patientService: PatientsTableService,
    private doctorService: DoctorsTableService
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
      name: 'Пациент',
      field: 'patient_id',
      sortable: true,
      width: 80,
      type: FieldType.number,
      filterable: true,
      filter: {model: Filters.compoundInputText},
      formatter: this.patientService.patientIdToValueFormatter,
    },
    {
      id: 1,
      name: 'Врач',
      field: 'doctor_id',
      sortable: true,
      width: 80,
      type: FieldType.number,
      filterable: true,
      filter: {model: Filters.compoundInputText},
      formatter: this.doctorService.doctorIdToValueFormatter,
    },
    {
      id: 3,
      name: 'Исследования',
      field: 'researches',
      sortable: true,
      minWidth: 50,
      type: FieldType.string,
      formatter: this.researchService.researchIdToValueFormatter,
    },
  ];

  override async onRowClick(item: any) {
    await this.router.navigate([APP_ROUTES.order_page], {
      queryParams: {
        'id': item.id
      }
    });
  }
}
