import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: '',
        redirectTo: 'menu',
        pathMatch: 'full'
      },
      {
        path: 'menu',
        loadChildren: ()=> import('../menu/menu.module').then(m=>m.MenuPageModule)
      },
      {
        path: 'modo-facil',
        loadChildren: ()=>import('../modo-facil/modo-facil.module').then(m=>m.ModoFacilPageModule)
      },
      {
        path: 'modo-medio',
        loadChildren: ()=>import('../modo-medio/modo-medio.module').then(m=>m.ModoMedioPageModule)
      },
      {
        path: 'modo-dificil',
        loadChildren: ()=>import('../modo-dificil/modo-dificil.module').then(m=>m.ModoDificilPageModule)
      },
      {
        path: 'mejores',
        loadChildren: ()=>import('../mejores/mejores.module').then(m=>m.MejoresPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
