import {Component, OnInit} from '@angular/core';
import {ApplicationsTableService} from "./applications.table.service";

@Component ({
  selector: 'app-applications-page',
  templateUrl: './applications.component.html',
})

export class ApplicationsComponent implements OnInit {
  protected itemUrl: string = 'http://45.141.100.40/api/doctor/';
  protected indexUrl: string = 'http://45.141.100.40/api/doctors';


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
