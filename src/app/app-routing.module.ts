import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BuyersComponent } from './components/buyers/buyers.component';
import { ProjectUsersComponent } from './users.component';

export const routes: Routes = [
  {
    path: 'view',
    component: ProjectUsersComponent,
    children: [
      {
        path: 'buyers',
        component: BuyersComponent,
      },
      {
        path: '**',
        redirectTo: 'buyers',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class UsersRoutingModule {}
