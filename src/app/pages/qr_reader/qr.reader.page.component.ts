import {AfterViewInit, Component} from '@angular/core';
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
import {APP_ROUTES} from "../../app-routing.module";

@Component({
  selector: 'app-qr-reader-page',
  templateUrl: './qr.reader.page.component.html',
  styleUrls: ['./qr.reader.page.component.scss'],
})
export class QrReaderPageComponent implements AfterViewInit{
  constructor(private router: Router, private alertController: AlertController,) {

  }

  ngAfterViewInit() {
    console.log('test');
    // setTimeout(() => {
    //   this.scannedCode({format: 'format', rawValue: '12'}).then();
    // }, 5000);
  }

  async scannedCode($event: { format: string, rawValue: string }) {
    await this.router.navigate([APP_ROUTES.order_page], {
      queryParams: {
        id: $event.rawValue
      }
    });
  }

}
