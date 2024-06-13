import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BaseItemService} from "../../../modules/item/base.item.service";
import {ActivatedRoute, Router} from "@angular/router";
import {VocabularyService} from "../../../helpers/vocabulary";
import {AlertController} from "@ionic/angular";
import {ReferencesTableService} from "../../references/list/references.table.service";

@Injectable({providedIn: 'root'})
export class TestItemService extends BaseItemService {
  selectedReferencesText = 'Реф. значения не выбраны';
  public availableRefs: any = [];
  public override item: any = {
    id: -1,
    name: '',
    code: '',
    refs: []
  };


  constructor(
    protected override route: ActivatedRoute,
    protected override httpClient: HttpClient,
    protected vocabulary: VocabularyService,
    protected override router: Router,
    protected override alertController: AlertController,
    private refService: ReferencesTableService
  ) {
    super(route, httpClient, router, alertController);
    this.refService.fetchRefs().subscribe((res: any) => {
      this.availableRefs = res;
    });
  }

  override applyItem(res: any) {
    this.item = res;
    this.item.refs = res.refs ? JSON.parse(res.refs) : [];
    // const selectedRisks = this.risksService.getRisksByIds(this.item.risks);
    this.selectedReferencesText = this.refService.formatData(this.item.refs);
  }

  override prepareToSave(item: any) {
    item.refs = JSON.stringify(item.refs);
    return item;
  }


  onChangeRefs(refs: string[]) {
    this.item.refs = [...refs];
    this.selectedReferencesText = this.refService.formatData(refs);
  }


}
