import {Component, OnInit, ViewChild} from '@angular/core';
import {IonModal} from "@ionic/angular";


import {AnalizatorsTableService} from "./analizators-table.service";
import {APP_API_URL} from "../../app.component";

@Component({
  selector: 'app-page-analizators',
  templateUrl: './analizators.component.html',
  styleUrls: ['./analizators.component.scss'],
})
export class AnalizatorsComponent implements OnInit {

  @ViewChild('newModal') newModal: IonModal | any;
  @ViewChild('editModal') editModal: IonModal | any;
  protected itemUrl: string = APP_API_URL + '/analizator/';
  protected indexUrl: string = APP_API_URL + '/analizators';

  constructor(public tableService: AnalizatorsTableService) {
  }

  ngOnInit() {
    this.tableService.prepareGrid(this.indexUrl);
  }

}
