import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  //{ path: 'parking-meter-set', loadChildren: './parking-meter-set/parking-meter-set.module#ParkingMeterSetPageModule' },
  { path: 'scanner', loadChildren: './scanner/scanner.module#ScannerPageModule' },
  { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './auth/signup/signup.module#SignupPageModule' },
  //{ path: 'forgot-password', loadChildren: './auth/forgot-password/forgot-password.module#ForgotPasswordPageModule' },
  { path: '', loadChildren: './auth/check-auth/check-auth.module#CheckAuthPageModule' },
  { path: 'car-list', loadChildren: './car/car-list/car-list.module#CarListPageModule' },
  { path: 'register-vehicle', loadChildren: './car/register-vehicle/register-vehicle.module#RegisterVehiclePageModule' },
  { path: 'scan-vehicle', loadChildren: './car/scan-vehicle/scan-vehicle.module#ScanVehiclePageModule' },
  { path: 'meter-started', loadChildren: './parking-meter/meter-started/meter-started.module#MeterStartedPageModule' },
  { path: 'landing', loadChildren: './landing/landing.module#LandingPageModule' },
  { path: 'personal-info', loadChildren: './verification/personal-info/personal-info.module#PersonalInfoPageModule' },
  //{ path: 'car-default', loadChildren: './car/car-default/car-default.module#CarDefaultPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
