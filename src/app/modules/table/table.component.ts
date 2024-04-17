import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Column, GridOption} from "angular-slickgrid"; // Column Definition Type Interface
@Component({
  selector: 'app-table',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './table.component.html',
  styleUrls: [
    './table.component.scss',
  ],
})
export class TableComponent {
  @Input() columns: Column[] = [];
  @Input() options: GridOption = {};
  @Input() data: any[] = [];
}
