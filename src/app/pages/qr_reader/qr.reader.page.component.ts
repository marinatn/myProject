import {AfterViewInit, Component} from '@angular/core';
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
import {APP_ROUTES} from "../../app-routing.module";

@Component({
  selector: 'app-qr-reader-page',
  templateUrl: './qr.reader.page.component.html',
  styleUrls: ['./qr.reader.page.component.scss'],
})
export class QrReaderPageComponent implements AfterViewInit {
  protected patientId: any = 0;
  protected timestamp: any = 0;
  protected investigations: any = 0;
  protected orderId: any = 0;

  constructor(private router: Router, private alertController: AlertController,) {

  }

  ngAfterViewInit() {
    // console.log('test');
    // setTimeout(() => {
    //   this.scannedCode({format: 'format', rawValue: '12'}).then();
    // }, 5000);
  }

  async scannedCode($event: { format: string, rawValue: string }) {
    // check format at \App\Http\Controllers\Api\ResearchOrderController::getBarCode on server side
    const data = $event.rawValue?.split('  ');
    if (data) {
      this.orderId = parseInt(data[0]);
      this.patientId = parseInt(data[1]);
      this.investigations = data[2].replace(' ', '; ');
      this.timestamp = data[3];
    }

  }

  showAnalyzerResults() {

  }

  async goToOrder() {
    await this.router.navigate([APP_ROUTES.order_page], {
      queryParams: {
        id: this.orderId
      }
    });
  }
}
