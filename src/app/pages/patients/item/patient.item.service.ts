import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BaseItemService} from "../../../modules/item/base.item.service";
import {ActivatedRoute, Router} from "@angular/router";
import {VocabularyService} from "../../../helpers/vocabulary";
import {AlertController} from "@ionic/angular";
import {RisksTableService} from "../../risks/list/risks.table.service";

@Injectable({providedIn: 'root'})
export class PatientItemService extends BaseItemService {
  selectedRisksText = 'Группы риска для пациента не выбраны';
  public availableRisks: any = [];
  public override item: any = {
    id: -1, fio: '',
    bith_date: '1970-01-01',
    snils_code: '',
    police_code: '',
    risks: [],
  };


  constructor(
    protected override route: ActivatedRoute,
    protected override httpClient: HttpClient,
    protected vocabulary: VocabularyService,
    protected override router: Router,
    protected override alertController: AlertController,
    private risksService: RisksTableService
  ) {
    super(route, httpClient, router, alertController);
    this.risksService.fetchRisks().subscribe((res:any) => {
      this.availableRisks = res;
    });
  }

  override applyItem(res: any) {
    this.item = res;
    this.item.risks = res.risks ? JSON.parse(res.risks) : [];
    this.selectedRisksText = this.risksService.formatData(this.item.risks);
  }

  override prepareToSave(item:any) {
    item.risks = JSON.stringify(item.risks);
    item.police_code = item.police_code.toString();
    item.snils_code = item.snils_code.toString();
    return item;
  }

  onChangeRisks(risks: string[]) {
    this.item.risks = [...risks];
    this.selectedRisksText = this.risksService.formatData(risks);
  }
}
