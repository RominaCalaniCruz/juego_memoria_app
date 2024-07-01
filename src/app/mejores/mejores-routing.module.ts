import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MejoresPage } from './mejores.page';

const routes: Routes = [
  {
    path: '',
    component: MejoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MejoresPageRoutingModule {}
