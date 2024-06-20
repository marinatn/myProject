import {TableServiceInterface} from "../../../interfaces/tableServiceInterface";
import {Column, FieldType, Filters, Formatter,} from "angular-slickgrid";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {Injectable} from "@angular/core";
import {AlertController} from "@ionic/angular";
import {BaseTableService} from "../../../modules/table/services/base.table.service";
import {VocabularyService} from "src/app/helpers/vocabulary";
import {Router} from "@angular/router";
import {APP_ROUTES} from "../../../app-routing.module";
import {Observable} from "rxjs";
import {APP_API_URL} from "../../../app.component";

@Injectable({providedIn: 'root'})
export class DoctorsTableService extends BaseTableService implements TableServiceInterface {
  availableDoctors: any[] = [];
  posts: any[] = [];

  constructor(override http: HttpClient, protected override translate: TranslateService, protected override alertController: AlertController, protected vocabulary: VocabularyService, private router: Router) {
    super(http, translate, alertController);
    this.posts = this.vocabulary.getPosts()
  }

  fetchDoctors(): Observable<any> {
    return new Observable((observer) => {
      if (this.availableDoctors.length > 0) {
        observer.next(this.availableDoctors);
        return observer.complete();
      } else {
        return this.http.get(APP_API_URL + '/doctors').subscribe((doctors: any) => {
          this.availableDoctors = doctors;
          observer.next(doctors);
          observer.complete();
        })
      }
    })
  }

  getDoctorsByIds(doctors: any[]) {
    return doctors.map((i: number) => {
      return this.availableDoctors.find((doctor: { id: number; }) => {
        return doctor.id === i
      });
    })
  }

  formatData(data: string[]) {
    if (data.length === 1) {
      const doctor = this.availableDoctors.find((risk: { id: string; fio: string }) => risk.id === data[0]);
      return doctor.fio;
    }

    return 'Врач не выбран';
  }

  doctorIdToValueFormatter: Formatter<any> = (_row, _cell, value) => {
    let str = '';
    // JSON.parse(value).forEach((k: number) => {
      let doctor = this.availableDoctors.find((doctor: { id: number; fio: string }) => {
        return doctor.id === value
      })
      if (doctor) {
        str = str + doctor.fio + '; ';
      } else {
        str = value + ';';
      }
    // })

    return str;
  };

  postIdToValueFormatter: Formatter<any> = (_row, _cell, value) => {
    const postId: number = parseInt(value);
    let post = this.posts.find((post: { id: number; name: string }) => {
      return post.id === postId
    })
    return post?post.name:'Должность не определена';
  }

  override getTableColumns = (): Column[] => [
    {
      id: 0,
      name: '№',
      field: 'id',
      sortable: true,
      width: 30,
      maxWidth: 30,
      type: FieldType.number
    },
    {
      id: 1,
      name: 'ФИО',
      field: 'fio',
      sortable: true,
      type: FieldType.string,
      filterable: true,
      filter: {model: Filters.compoundInputText}
    },
    {
      id: 1,
      name: 'СНИЛС',
      field: 'snils',
      sortable: true,
      type: FieldType.string,
      filterable: true,
      filter: {model: Filters.compoundInputText}
    },

    {
      id: 5,
      name: 'Должность',
      field: 'post',
      type: FieldType.string,
      formatter: this.postIdToValueFormatter,
    },
  ];

  override async onRowClick(item: any) {
    await this.router.navigate([APP_ROUTES.doctor_page], {
      queryParams: {
        'id': item.id
      }
    });
  }
}
