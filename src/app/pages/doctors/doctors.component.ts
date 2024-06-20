import {Component, OnInit, ViewChild} from '@angular/core';
import {IonModal} from "@ionic/angular";
import {DoctorsTableService} from "./doctors-table.service";
import {APP_API_URL} from "../../app.component";


@Component({
  selector: 'app-page-doctors',
  templateUrl: 'doctors.component.html',
  styleUrls: ['./doctors.component.scss'],
})
export class DoctorsComponent implements OnInit {
  @ViewChild('newModal') newModal: IonModal | any;
  @ViewChild('editModal') editModal: IonModal | any;

  protected itemUrl: string = APP_API_URL + '/doctor/';
  protected indexUrl: string = APP_API_URL + '/doctors';

  constructor(public tableService: DoctorsTableService) {
  }

  ngOnInit() {
    this.tableService.prepareGrid(this.indexUrl);
  }
}
