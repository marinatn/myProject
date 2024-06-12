import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BaseItemService} from "../../../modules/item/base.item.service";
import {ActivatedRoute, Router} from "@angular/router";
import {VocabularyService} from "../../../helpers/vocabulary";
import {AlertController} from "@ionic/angular";
import {RisksTableService} from "../../risks/list/risks.table.service";

@Injectable({providedIn: 'root'})
export class ReferenceItemService extends BaseItemService {
  selectedRisksText = 'Группы риска для реф. значения не выбраны';
  public availableRisks: any = [];
  public override item: any = {
    id: -1,
    name: '',
    min: 0,
    max: 1,
    risks: []

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
    // const selectedRisks = this.risksService.getRisksByIds(this.item.risks);
    this.selectedRisksText = this.risksService.formatData(this.item.risks);
  }

  override prepareToSave(item:any) {
    item.risks = JSON.stringify(item.risks);
    return item;
  }


  onChangeRisks(risks: string[]) {
    this.item.risks = [...risks];
    this.selectedRisksText = this.risksService.formatData(risks);
  }


}
