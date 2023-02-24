import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartModule } from "./chart/chart.module";
import { KonvaModule } from "./konva/konva.module";


export const routes: Routes = [
  {
    path: 'konva',
    loadChildren: (): Promise<KonvaModule> => import('./konva/konva.module').then(m => m.KonvaModule),
  },
  {
    path: 'chart',
    loadChildren: (): Promise<ChartModule> => import('./chart/chart.module').then(m => m.ChartModule)
  },
  {
    path: '',
    redirectTo: 'chart',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
