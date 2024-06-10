import {Component, OnInit, ViewChild} from "@angular/core";
import {Column, GridOption} from "angular-slickgrid";
import {IonModal} from "@ionic/angular";
import {MainDataView, TableRowCRUDMode, TableRowOpts} from "../../modules/table/services/base.table.service";
import {OverlayEventDetail} from "@ionic/core/components";
import {BcpDataView, BcpTableService} from "./bcp-table.service";

@Component({
  selector: 'app-bcp',
  templateUrl: './bcp.page.html',
  styleUrls: ['./bcp.page.scss'],
})

export class BcpPage implements OnInit {
  @ViewChild('newModal') newModal: IonModal | any;
  @ViewChild('editModal') editModal: IonModal | any;

  protected itemUrl: string = 'http://localhost:8000/api/research/';
  protected indexUrl: string = 'http://localhost:8000/api/researches';

  ngOnInit() {
    this.tableService.prepareGrid(this.indexUrl);
  }

  constructor(public tableService: BcpTableService) {

  }

}
