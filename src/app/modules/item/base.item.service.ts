import {ActivatedRoute, Params, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AlertController} from "@ionic/angular";
import {APP_API_URL} from "../../app.component";

export class BaseItemService {
  id: number = 0;
  item: any = {};
  defaultItem: any = {};
  toastMsg: string = '';
  isOpenToast: boolean = false;
  protected baseItemUrl: string = APP_API_URL + '/item/';
  protected itemUrl: string = APP_API_URL + '/item/';

  constructor(
    protected route: ActivatedRoute,
    protected httpClient: HttpClient,
    protected router: Router,
    protected alertController: AlertController,
  ) {

  }

  initItem(url: string, path: string) {
    this.itemUrl = url;
    this.baseItemUrl = this.itemUrl;
    this.defaultItem = {...this.item};
    this.route.queryParams.subscribe((params: Params) => {
      if (params['id'] > 0) {
        this.id = params['id']
      } else {
        this.id = 0;
        this.item = {...this.defaultItem};
      }
    });
    if (this.id) {
      this.itemUrl = this.itemUrl + this.id;
      this.httpClient.get(this.itemUrl).subscribe((res: any) => {
        this.applyItem(res);
      }, () => {
        this.router.navigate([path]).then();
      });
    }
  }

  async save(redirectPath: string, asNew: boolean = false) {
    const preparedItem = this.prepareToSave({...this.item});
    // item.id = this._dataset.length + 1;
    // delete item.id;
    if (!preparedItem.id || preparedItem.id <= 0 || asNew) {
      // if (asNew) {
        preparedItem.id = -1;
        this.itemUrl = this.baseItemUrl;
      // }
      this.httpClient.post(this.itemUrl, preparedItem).subscribe((res: any) => {
        this.router.navigate([redirectPath], {queryParams: {id: res.id}});
        this.id = res.id;
        this.item = res;
        this.toastMsg = "Запись создана";
        this.setOpenToast(true);
      }, (err: any) => {
        this.toastMsg = err;
        // this.toastMsg = "Ошибка сохранения";
        this.setOpenToast(true);
      });
    } else {
      this.httpClient.put(this.itemUrl, preparedItem).subscribe((res: any) => {
        this.toastMsg = "Запись обновлена";
        this.applyItem(res);
        this.setOpenToast(true);
      }, (err: any) => {
        this.toastMsg = err;
        // this.toastMsg = "Ошибка сохранения";
        this.setOpenToast(true);
      });
    }

  }

  prepareToSave(item: any) {
    return item;
  }

  applyItem(res: any) {
    this.item = res;
  }

  setOpenToast(isOpen: boolean) {
    this.isOpenToast = isOpen;
  }

  async deleteAlert(
    redirectPath: string = '',
    header: string = 'Удаление заголовок',
    subHeader: string = 'Удаление подзаголовок',
    message: string = 'Удаление сообщение',) {
    if (this.item.id) {
      const alert = await this.alertController.create({
        header: header,
        subHeader: subHeader,
        message: message,
        buttons: [{
          text: 'Отмена',
          role: 'cancel',
          handler: () => {
            console.log('Alert canceled');
          },
        },
          {
            text: 'Удалить',
            role: 'confirm',
            handler: () => {
              this.deleteItem(redirectPath);
            },
          },],
      });

      await alert.present();
    }
  }

  deleteItem(redirectPath: string) {
    this.httpClient.delete(this.itemUrl).subscribe(() => {
      this.router.navigate([redirectPath]).then();
    }, (err) => {
      this.toastMsg = err;
      this.setOpenToast(true);
    });
  }

}
