import {Component, OnInit, ViewChild} from '@angular/core';
import {Column, GridOption} from "angular-slickgrid";
import {IonModal} from "@ionic/angular";
import {ScheduleDataView, TableRowCRUDMode, TableRowOpts} from "../../modules/table/services/base.table.service";
import {OverlayEventDetail} from "@ionic/core/components";
import {DoctorsDataView, DoctorsTableService} from "./doctors-table.service";


@Component({
  selector: 'app-page-doctors',
  templateUrl: 'doctors.component.html',
  styleUrls: ['./doctors.component.scss'],
})
export class DoctorsComponent implements OnInit {
  @ViewChild('newModal') newModal: IonModal | any;
  @ViewChild('editModal') editModal: IonModal | any;

  protected itemUrl: string = 'http://localhost:8000/api/doctor/';
  protected indexUrl: string = 'http://localhost:8000/api/doctors';
  
  constructor(public tableService: DoctorsTableService) {
  }

  ngOnInit() {
    this.tableService.prepareGrid(this.indexUrl);
  }
}
