import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModoMedioPageRoutingModule } from './modo-medio-routing.module';

import { ModoMedioPage } from './modo-medio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModoMedioPageRoutingModule
  ],
  declarations: [ModoMedioPage]
})
export class ModoMedioPageModule {}
