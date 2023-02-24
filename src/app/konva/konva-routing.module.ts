import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KonvaComponent } from "./components/konva/konva.component";

const routes: Routes = [
  {
    path: '',
    component: KonvaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KonvaRoutingModule { }
