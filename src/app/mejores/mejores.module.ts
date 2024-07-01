import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MejoresPageRoutingModule } from './mejores-routing.module';

import { MejoresPage } from './mejores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MejoresPageRoutingModule
  ],
  declarations: [MejoresPage]
})
export class MejoresPageModule {}
