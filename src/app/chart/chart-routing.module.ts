import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from "./app.component";
import {ChartModule} from "./chart/chart.module";


export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'chart',
    loadChildren: (): Promise<ChartModule> => import('./chart/chart.module').then(m => m.ChartModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
