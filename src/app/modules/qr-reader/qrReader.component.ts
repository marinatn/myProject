import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BarcodeScanner} from "@capacitor-mlkit/barcode-scanning";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-qr-reader',
  templateUrl: './qrReader.component.html',
  styleUrls: ['./qrReader.component.scss'],
})
export class QrReaderComponent implements OnInit {
  @Output() scanCode = new EventEmitter<{format: string, rawValue: string}>();
  isSupported = false;
  barcodes: /*Barcode*/any[] = [
    {format: 'format', rawValue: 'rawValue'},
    {format: 'format', rawValue: 'rawValue'},
    {format: 'format', rawValue: 'rawValue'}
  ];

  constructor(private alertController: AlertController) {}

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      await this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
    this.scanCode.emit(barcodes[0]);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
