import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BaseItemService} from "../../../modules/item/base.item.service";
import {ActivatedRoute, Router} from "@angular/router";
import {VocabularyService} from "../../../helpers/vocabulary";
import {AlertController} from "@ionic/angular";
import {TestsTableService} from "../../tests/list/tests.table.service";
import {AnalizatorsTableService} from "../../analizators/analizators-table.service";

@Injectable({providedIn: 'root'})
export class ResearchItemService extends BaseItemService {
  selectedTestsText = 'Тесты не выбраны';
  selectedAnalyserText = 'Анализатор не выбран';
  public availableTests: any = [];
  public availableAnalysers: any = [];
  public override item: any = {
    id: -1,
    name: '',
    code: '',
    tests: [],
    analyser_id: []
  };

  constructor(
    protected override route: ActivatedRoute,
    protected override httpClient: HttpClient,
    protected vocabulary: VocabularyService,
    protected override router: Router,
    protected override alertController: AlertController,
    private testsService: TestsTableService,
    private analysersService: AnalizatorsTableService,
  ) {
    super(route, httpClient, router, alertController);
    this.testsService.fetchTests().subscribe((res: any) => {
      this.availableTests = res;
    });
    this.analysersService.fetchAnalysers().subscribe((res: any) => {
      this.availableAnalysers = res;
    });
  }

  override applyItem(res: any) {
    this.item = res;
    this.item.tests = res.tests ? JSON.parse(res.tests) : [];
    // const selectedRisks = this.risksService.getRisksByIds(this.item.risks);
    this.selectedTestsText = this.testsService.formatData(this.item.tests);
    this.selectedAnalyserText = this.analysersService.formatData(this.item.analyser_id);
  }

  override prepareToSave(item: any) {
    item.tests = JSON.stringify(item.tests);
    item.analyser_id = item.analyser_id[0];
    return item;
  }


  onChangeTests(tests: string[]) {
    this.item.tests = [...tests];
    this.selectedTestsText = this.testsService.formatData(tests);
  }

  onChangeAnalyser(analysers: string[]) {
    this.item.analyser_id = [...analysers];
    this.selectedAnalyserText = this.analysersService.formatData(analysers);
  }





}
