import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallemenuPage } from './detallemenu.page';

const routes: Routes = [
  {
    path: ':idNegocio',
    component: DetallemenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallemenuPageRoutingModule {}
