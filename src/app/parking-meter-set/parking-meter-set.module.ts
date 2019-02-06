import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ParkingMeterSetPage } from './parking-meter-set.page';

const routes: Routes = [
  {
    path: '',
    component: ParkingMeterSetPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ParkingMeterSetPage]
})
export class ParkingMeterSetPageModule {}
