import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service'
import { Vehicle } from '../../model/Vehicle'
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-vehicle',
  templateUrl: './register-vehicle.page.html',
  styleUrls: ['./register-vehicle.page.scss'],
})
export class RegisterVehiclePage implements OnInit {



  rego_number: string
  newNumberPlate: boolean;
  colour: any;
  car_type: any;
  state: any;

  subs: Subscription[] = [];
  id: string;
  vehicles: Vehicle[];
  vehicle: Vehicle;

  constructor(
    private vehicleService: VehicleService,
    public alertController: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.newNumberPlate = false
  }

  setFilteredItems(numberPlate) {
    //this.numberPlate = numberPlate.toUpperCase();
  }

  regoCheck() {

    const sub = this.vehicleService.getVehicle(this.rego_number)
      .subscribe(doc => {
        this.vehicles = doc
        console.log(this.vehicles)
        if (this.vehicles[0] == null) {
          this.newNumberPlate = true
        } else {
          this.presentAlert()
        }
      });
    this.subs.push(sub);
  }

  async presentAlert() {
  const alert = await this.alertController.create({
    header: 'Ooops 😳',
    message: 'It seems this car is already registered.',
    buttons: ['OK']
  });

  await alert.present();
}

close() {
  this.router.navigateByUrl('car-list');
}

addVehicle(){
  
}



}
