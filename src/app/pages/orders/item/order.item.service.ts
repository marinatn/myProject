import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BaseItemService} from "../../../modules/item/base.item.service";
import {ActivatedRoute, Router} from "@angular/router";
import {VocabularyService} from "../../../helpers/vocabulary";
import {AlertController} from "@ionic/angular";
import {TestsTableService} from "../../tests/list/tests.table.service";
import {ResearchesTableService} from "../../researches/list/researches.table.service";
import {PatientsTableService} from "../../patients/list/patients.table.service";
import {DoctorsTableService} from "../../doctors/list/doctors.table.service";

@Injectable({providedIn: 'root'})
export class OrderItemService extends BaseItemService {
  selectedResearchesText = 'Исследования не выбраны';
  selectedPatientText = 'Пациент не выбран';
  selectedDoctorText = 'Врач не выбран';
  public availableResearches: any = [];
  public availablePatients:any = [];
  public availableDoctors:any = [];
  public override item: any = {
    id: -1,
    patient_id: [],
    is_cito: true,
    researches: [],
    bar_code: '',
    doctor_id: []
  };

  constructor(
    protected override route: ActivatedRoute,
    protected override httpClient: HttpClient,
    protected vocabulary: VocabularyService,
    protected override router: Router,
    protected override alertController: AlertController,
    private researchesService: ResearchesTableService,
    private patientService: PatientsTableService,
    private doctorService: DoctorsTableService
  ) {
    super(route, httpClient, router, alertController);
    this.researchesService.fetchResearches().subscribe((res: any) => {
      this.availableResearches = res;
    });
    this.doctorService.fetchDoctors().subscribe((res: any) => {
      this.availableDoctors = res;
    });
    this.patientService.fetchPatients().subscribe((res: any) => {
      this.availablePatients = res;
    });
  }

  override applyItem(res: any) {
    this.item = res;
    this.item.researches = res.researches ? JSON.parse(res.researches) : [];
    this.item.patient_id = res.patient_id ? [res.patient_id] : [];
    this.item.doctor_id = res.doctor_id ? [res.doctor_id] : [];
    this.selectedResearchesText = this.researchesService.formatData(this.item.researches);
    this.selectedPatientText = this.patientService.formatData(this.item.patient_id);
    this.selectedDoctorText = this.doctorService.formatData(this.item.doctor_id);
  }

  override prepareToSave(item: any) {
    item.researches = JSON.stringify(item.researches);
    item.patient_id = item.patient_id[0];
    item.doctor_id = item.doctor_id[0];
    return item;
  }


  onChangeResearches(researches: string[]) {
    this.item.researches = [...researches];
    this.selectedResearchesText = this.researchesService.formatData(researches);
  }

  onChangePatient(patients: string[]) {
    this.item.patient_id = [...patients];
    this.selectedPatientText = this.patientService.formatData(patients);
  }

  onChangeDoctor(doctors: string[]) {
    this.item.doctor_id = [...doctors];
    this.selectedDoctorText = this.doctorService.formatData(doctors);
  }

}
