import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {BCPPageRoutingModule} from './bcp-routing.module';
import {BcpPage} from "./bcp.page";
import {QrModule} from "../../modules/qr/qr.module";


@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, BCPPageRoutingModule, QrModule], declarations: [BcpPage]
})
export class BCPPageModule {
}
