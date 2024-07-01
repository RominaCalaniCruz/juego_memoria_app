import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModoFacilPageRoutingModule } from './modo-facil-routing.module';

import { ModoFacilPage } from './modo-facil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModoFacilPageRoutingModule
  ],
  declarations: [ModoFacilPage]
})
export class ModoFacilPageModule {}
