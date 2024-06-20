import {Component, OnInit} from '@angular/core';
import {ApplicationsTableService} from "./applications.table.service";
import {APP_API_URL} from "../../app.component";

@Component ({
  selector: 'app-applications-page',
  templateUrl: './applications.component.html',
})

export class ApplicationsComponent implements OnInit {
  protected itemUrl: string = APP_API_URL + '/doctor/';
  protected indexUrl: string = APP_API_URL + '/doctors';


  selectedRisksText = '0 Items';
  selectedFruits: string[] = [];


  constructor(public tableService: ApplicationsTableService) {
  }

  ngOnInit() {
    this.tableService.prepareGrid(this.indexUrl);
  }

  // private formatData(data: string[]) {
  //   if (data.length === 1) {
  //     const fruit = this.fruits.find((fruit) => fruit.value === data[0]);
  //     return fruit.text;
  //   }

  //   return `${data.length} items`;
  // }

  // fruitSelectionChanged(fruits: string[]) {
  //   this.selectedFruits = fruits;
  //   this.selectedFruitsText = this.formatData(this.selectedFruits);
  //   this.modal.dismiss();
  // }
}
