import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModoFacilPage } from './modo-facil.page';

const routes: Routes = [
  {
    path: '',
    component: ModoFacilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModoFacilPageRoutingModule {}
