import {Component, OnInit, ViewChild} from '@angular/core';
import {IonModal} from "@ionic/angular";


import {AnalizatorsTableService} from "./analizators-table.service";

@Component({
  selector: 'app-page-analizators',
  templateUrl: './analizators.component.html',
  styleUrls: ['./analizators.component.scss'],
})
export class AnalizatorsComponent implements OnInit {

  @ViewChild('newModal') newModal: IonModal | any;
  @ViewChild('editModal') editModal: IonModal | any;
  protected itemUrl: string = 'http://45.141.100.40/api/analizator/';
  protected indexUrl: string = 'http://45.141.100.40/api/analizators';

  constructor(public tableService: AnalizatorsTableService) {
  }

  ngOnInit() {
    this.tableService.prepareGrid(this.indexUrl);
  }

}
