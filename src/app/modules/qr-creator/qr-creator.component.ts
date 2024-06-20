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
    this.px2mmFactor = this.calcPx2MmFactor();
    JsBarcode('#barcode', this.data.toString(), {
      format: 'code128', // default
      // height: 50,
      // width: 2,
      // displayValue: true,
      // text: this.data.toString(),
      // background: 'rgba(255,255,255,1)',
      // font: 'monospace',
      // fontOptions: 'regular',
      // fontSize: 18,
      // lineColor: 'blackwhite',
      // margin: 5,
      // textMargin: 1,
      // textAlign: 'center',
      // textPosition: 'bottom',
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
