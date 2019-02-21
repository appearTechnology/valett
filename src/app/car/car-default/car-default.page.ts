import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service'
import { Vehicle } from '../../model/Vehicle'
import { AuthServiceService } from '../../services/auth-service.service';
import { Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-car-default',
  templateUrl: './car-default.page.html',
  styleUrls: ['./car-default.page.scss'],
})
export class CarDefaultPage implements OnInit {

  addVehicle: boolean;
  uid: string;
  subs: Subscription[] = [];
  vehicles: Vehicle[];
  vehicle: Vehicle;

  constructor(
    private router: Router,
    private vehicleService: VehicleService,
    private authService: AuthServiceService,
    public modalController: ModalController,
  ) { }

  ngOnInit() {
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
    this.close()
  }

  close() {
    this.modalController.dismiss();
  }

}
