import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {APP_ROUTES} from "./app-routing.module";
import {Router} from "@angular/router";
import {AuthenticationService} from "./services";
import {IonMenu} from "@ionic/angular/directives/proxies";


// export const APP_API_URL = "http://localhost:8000/api";
export const APP_API_URL = "http://45.141.100.40/api"
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: [
    'app.component.scss'
  ],


  // imports: [MatToolbarModule, MatButtonModule, MatIconModule],
})



export class AppComponent {
  private values: string [] = ['1', '2'];
  public activeTab: string = 'test';
  @ViewChild('mainMenu') mainMenu: IonMenu | undefined;
  constructor(private router: Router, protected authService: AuthenticationService) {}

  accordionGroupChange = (ev: any) => {
    const collapsedItems = this.values.filter((value) => value !== ev.detail.value);
    const selectedValue = ev.detail.value;

    console.log(
      `Expanded: ${selectedValue === undefined ? 'None' : ev.detail.value} | Collapsed: ${collapsedItems.join(', ')}`
    );
  }

  async change(activeTab: string) {
    this.activeTab =  activeTab;
    await this.router.navigate([activeTab]);
  }

  protected readonly APP_ROUTES = APP_ROUTES;

  async goToPage(ref: string) {
    await this.router.navigate([ref]);
    if (this.mainMenu) {
      await this.mainMenu.close(true);
    }


  }
}

