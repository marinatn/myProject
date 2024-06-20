import {Component, OnInit, ViewChild} from "@angular/core";
import {Column, GridOption} from "angular-slickgrid";
import {IonModal} from "@ionic/angular";
import {MainDataView, TableRowCRUDMode, TableRowOpts} from "../../modules/table/services/base.table.service";
import {OverlayEventDetail} from "@ionic/core/components";
import {BcpDataView, BcpTableService} from "./bcp-table.service";
import {APP_API_URL} from "../../app.component";

@Component({
  selector: 'app-bcp',
  templateUrl: './bcp.page.html',
  styleUrls: ['./bcp.page.scss'],
})

export class BcpPage implements OnInit {
  @ViewChild('newModal') newModal: IonModal | any;
  @ViewChild('editModal') editModal: IonModal | any;

  protected itemUrl: string = APP_API_URL + '/research/';
  protected indexUrl: string = APP_API_URL + '/researches';

  ngOnInit() {
    this.tableService.prepareGrid(this.indexUrl);
  }

  constructor(public tableService: BcpTableService) {

  }

}
