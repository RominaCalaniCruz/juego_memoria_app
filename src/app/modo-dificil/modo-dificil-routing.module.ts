import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModoDificilPage } from './modo-dificil.page';

const routes: Routes = [
  {
    path: '',
    component: ModoDificilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModoDificilPageRoutingModule {}
