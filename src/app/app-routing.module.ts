import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'modo-facil',
    loadChildren: () => import('./modo-facil/modo-facil.module').then( m => m.ModoFacilPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'modo-medio',
    loadChildren: () => import('./modo-medio/modo-medio.module').then( m => m.ModoMedioPageModule)
  },
  {
    path: 'modo-dificil',
    loadChildren: () => import('./modo-dificil/modo-dificil.module').then( m => m.ModoDificilPageModule)
  },
  {
    path: 'mejores',
    loadChildren: () => import('./mejores/mejores.module').then( m => m.MejoresPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
