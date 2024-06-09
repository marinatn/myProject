import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BaseItemService} from "../../../modules/item/base.item.service";
import {ActivatedRoute, Router} from "@angular/router";
import {VocabularyService} from "../../../helpers/vocabulary";
import {AlertController} from "@ionic/angular";

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
    protected override alertController: AlertController
  ) {
    super(route, httpClient, router, alertController);
    this.availableRisks = this.vocabulary.getRiskCategories();
  }

  override applyItem(res: any) {
    this.item = res;
    this.item.risks = res.risks ? JSON.parse(res.risks) : [];
    this.selectedRisksText = this.formatData(this.item.risks.map((i: number) => {
      return this.availableRisks.find((risk: { value: number; }) => {
        return risk.value === i
      });
    }))
  }

  override prepareToSave(item:any) {
    item.risks = JSON.stringify(item.risks);
    item.police_code = item.police_code.toString();
    item.snils_code = item.snils_code.toString();
    return item;
  }


  onChangeRisks(risks: string[]) {
    this.item.risks = [...risks];
    this.selectedRisksText = this.formatData(risks);
  }

  private formatData(data: string[]) {
    if (data.length === 1) {
      const risk = this.availableRisks.find((risk: { value: string; text: string }) => risk.value === data[0]);
      return risk.text;
    }

    return `${data.length} группы риска для пациента`;
  }
}
