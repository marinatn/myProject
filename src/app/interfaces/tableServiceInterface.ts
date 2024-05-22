import {
  Column,
  CompoundInputFilter,
  FormatterResultWithHtml,
  FormatterResultWithText,
  GridOption,
  SlickGrid
} from "angular-slickgrid";
import {CustomInputFilter} from "../modules/table/filters/custom.input/custom.input";
import {TimingDataView} from "../pages/timing/timing-table.service";
import {Observable} from "rxjs";

export interface TableServiceInterface {
  getTableColumns(): Column[];
  getTableOptions(): GridOption
  updateData(url:string):  Observable<Object>;
}
