import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModoDificilPageRoutingModule } from './modo-dificil-routing.module';

import { ModoDificilPage } from './modo-dificil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModoDificilPageRoutingModule
  ],
  declarations: [ModoDificilPage]
})
export class ModoDificilPageModule {}
