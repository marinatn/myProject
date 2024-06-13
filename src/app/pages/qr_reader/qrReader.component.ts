import {Component} from '@angular/core';
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
import {APP_ROUTES} from "../../app-routing.module";

@Component({
  selector: 'app-qr-reader-page',
  templateUrl: './qrReader.component.html',
  styleUrls: ['./qrReader.component.scss'],
})
export class QrReaderComponent {

  constructor(private router: Router, private alertController: AlertController,) {
  }

  async scannedCode($event: { format: string, rawValue: string }) {
    await this.router.navigate([APP_ROUTES.order_page], {
      queryParams: {
        id: $event.rawValue
      }
    });
  }

}
