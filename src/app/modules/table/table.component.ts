import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ColDef} from 'ag-grid-community'; // Column Definition Type Interface
@Component({
  selector: 'app-table',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input('rowData') rowData: any[] = []
  @Input('colDefs') colDefs: ColDef[] = []

  constructor() {
  }

  ngOnInit() {
  }

}
