import { Component, OnInit } from '@angular/core';
import { Platform, MenuController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service'
import { Vehicle } from '../../model/Vehicle'
import { AuthServiceService } from '../../services/auth-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.page.html',
  styleUrls: ['./car-list.page.scss'],
})
export class CarListPage implements OnInit {

  addVehicle: boolean;
  uid: string;
  subs: Subscription[] = [];
  vehicles: Vehicle[];
  vehicle: Vehicle;

  constructor(
    public menuCtrl: MenuController,
    private router: Router,
    private vehicleService: VehicleService,
    private authService: AuthServiceService, ) { }

  ngOnInit() {
    this.addVehicle = false
    this.auth()
  }

  auth() {
    const sub = this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.uid = auth.uid
        this.getVehicles()
        this.getDefaultVehicle()
      } else {
        this.router.navigate(['login'])
      }
    });
    this.subs.push(sub)
  }

  getVehicles(){
    const sub = this.vehicleService.getUserVehicles(this.uid)
      .subscribe(doc => {
        this.vehicles = doc
        console.log(this.vehicles)
      });
    this.subs.push(sub);
  }

  getDefaultVehicle(){
    const sub = this.vehicleService.getUserDefaultVehicle(this.uid)
      .subscribe(doc => {
        this.vehicle = doc
        console.log(this.vehicle)
      });
    this.subs.push(sub);
  }

  setDefault(i){
    this.vehicleService.setUserDefaultVehicle(i, this.uid)
  }

  openMenu() {
    this.menuCtrl.open();
  }

  add() {
    this.addVehicle = true
  }

  register() {
    this.router.navigateByUrl('register-vehicle');
  }


}
