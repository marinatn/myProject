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
})


export class AppComponent {
  @ViewChild('mainMenu') mainMenu: IonMenu | undefined;
  protected readonly APP_ROUTES = APP_ROUTES;

  constructor(private router: Router, protected authService: AuthenticationService) {
  }

  async goToPage(ref: string) {
    await this.router.navigate([ref], {replaceUrl: true});
    if (this.mainMenu) {
      await this.mainMenu.close(true);
    }
  }
}

