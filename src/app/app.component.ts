import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public activeTab: string = 'test';
  constructor() {}

  change(activeTab: string) {
    this.activeTab =  activeTab;
  }
}
