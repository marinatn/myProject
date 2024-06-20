import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BaseItemService} from "../../../modules/item/base.item.service";
import {ActivatedRoute, Router} from "@angular/router";
import {VocabularyService} from "../../../helpers/vocabulary";
import {AlertController} from "@ionic/angular";

@Injectable({providedIn: 'root'})
export class DoctorItemService extends BaseItemService {
  public posts: any[] = []
  public override item: any = {
    id: -1,
    fio: '',
    snils: 0,
    post: 0
  };


  constructor(
    protected override route: ActivatedRoute,
    protected override httpClient: HttpClient,
    protected vocabulary: VocabularyService,
    protected override router: Router,
    protected override alertController: AlertController
  ) {
    super(route, httpClient, router, alertController);
    this.posts = this.vocabulary.getPosts()
  }

  override applyItem(res: any) {
    this.item = res;
  }

  override prepareToSave(item: any) {
    // item.name = item.name;
    return item;
  }
}
