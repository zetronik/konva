import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KonvaRoutingModule } from './konva-routing.module';
import { KonvaComponent } from './components/konva/konva.component';

@NgModule({
  declarations: [
    KonvaComponent
  ],
  imports: [
    CommonModule,
    KonvaRoutingModule
  ],
})
export class KonvaModule { }
