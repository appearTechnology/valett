import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderFlowComponent } from './loader-flow/loader-flow.component'
import { DefaultVehicleComponent } from './default-vehicle/default-vehicle.component'
import { LottieAnimationViewModule } from 'ng-lottie';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    LoaderFlowComponent,
    DefaultVehicleComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    LottieAnimationViewModule
  ],
  exports: [ LoaderFlowComponent ]
})
export class ComponentsModule { }
