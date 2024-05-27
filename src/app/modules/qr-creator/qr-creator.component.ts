import {AfterViewInit, Component, Input} from '@angular/core';
import JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-qr-creator',
  templateUrl: './qr-creator.component.html',
  styleUrls: ['./qr-creator.component.scss'],
})
export class QrCreatorComponent implements AfterViewInit {
  px2mmFactor: number;
  @Input() data = (new Date).getTime();
  ngAfterViewInit() {
    // this.px2mmFactor = this.calcPx2MmFactor();
    JsBarcode('#barcode', this.data.toString(), {
      format: 'code128', // default
      // height: 10 * this.px2mmFactor, // 10mm
      width: 2.3,
      displayValue: true,
      text: '-' + this.data.toString() + '-',
      background: 'rgba(0,0,0,0.1)',
      font: 'monospace',
      fontOptions: 'bold',
      fontSize: 16,
      lineColor: 'darkblue',
      // margin: 5 * this.px2mmFactor, // 5mm
      // textMargin: 2 * this.px2mmFactor, // 2mm
      textAlign: 'right',
      textPosition: 'top',
    });
  }

  private calcPx2MmFactor() {
    let e = document.createElement('div');
    e.style.position = 'relative';
    e.style.width = '100mm';
    document.body.appendChild(e);
    let rect = e.getBoundingClientRect();
    document.body.removeChild(e);
    return rect.width / 100;
  }
}
