import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallemenuPageRoutingModule } from './detallemenu-routing.module';

import { DetallemenuPage } from './detallemenu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallemenuPageRoutingModule
  ],
  declarations: [DetallemenuPage]
})
export class DetallemenuPageModule {}
