import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModoMedioPage } from './modo-medio.page';

const routes: Routes = [
  {
    path: '',
    component: ModoMedioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModoMedioPageRoutingModule {}
