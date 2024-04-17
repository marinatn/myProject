import {Column, GridOption} from "angular-slickgrid";

export interface ViewInterface {
  getTableColumns(): Column[];
  getTableOptions(): GridOption
  getTableData(): any[]
}
