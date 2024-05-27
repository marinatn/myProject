import {Column, GridOption,} from "angular-slickgrid";
import {Observable} from "rxjs";

export interface TableServiceInterface {
  getTableColumns(): Column[];
  getTableOptions(): GridOption
  getTableData(url:string):  Observable<Object>;
}
