import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BaseItemService} from "../../../modules/item/base.item.service";
import {ActivatedRoute, Router} from "@angular/router";
import {VocabularyService} from "../../../helpers/vocabulary";
import {AlertController} from "@ionic/angular";
import {TestsTableService} from "../../tests/list/tests.table.service";

@Injectable({providedIn: 'root'})
export class ResearchItemService extends BaseItemService {
  selectedTestsText = 'Тесты не выбраны';
  public availableTests: any = [];
  public override item: any = {
    id: -1,
    name: '',
    code: '',
    tests: []
  };

  constructor(
    protected override route: ActivatedRoute,
    protected override httpClient: HttpClient,
    protected vocabulary: VocabularyService,
    protected override router: Router,
    protected override alertController: AlertController,
    private testsService: TestsTableService
  ) {
    super(route, httpClient, router, alertController);
    this.testsService.fetchTests().subscribe((res: any) => {
      this.availableTests = res;
    });
  }

  override applyItem(res: any) {
    this.item = res;
    this.item.tests = res.tests ? JSON.parse(res.tests) : [];
    // const selectedRisks = this.risksService.getRisksByIds(this.item.risks);
    this.selectedTestsText = this.testsService.formatData(this.item.tests);
  }

  override prepareToSave(item: any) {
    item.tests = JSON.stringify(item.tests);
    return item;
  }


  onChangeTests(tests: string[]) {
    this.item.tests = [...tests];
    this.selectedTestsText = this.testsService.formatData(tests);
  }


}
