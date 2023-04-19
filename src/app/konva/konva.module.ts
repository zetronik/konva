import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KonvaRoutingModule } from './konva-routing.module';
import { KonvaComponent } from './components/konva/konva.component';
import {NgxFileDropModule} from "ngx-file-drop";

@NgModule({
  declarations: [
    KonvaComponent
  ],
    imports: [
        CommonModule,
        KonvaRoutingModule,
        NgxFileDropModule
    ],
})
export class KonvaModule { }
