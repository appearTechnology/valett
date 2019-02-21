import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service'
import { Vehicle } from '../../model/Vehicle'
import { AuthServiceService } from '../../services/auth-service.service';
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
  uid: string;
  vehicles: Vehicle[];
  vehicle: Vehicle;

  constructor(
    private vehicleService: VehicleService,
    private authService: AuthServiceService,
    public alertController: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.newNumberPlate = false
    this.auth()
  }

  auth() {
    const sub = this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.uid = auth.uid
      } else {
        this.router.navigate(['login'])
      }
    });
    this.subs.push(sub)
  }

  setFilteredItems(numberPlate) {
    //this.numberPlate = numberPlate.toUpperCase();
  }

  regoCheck() {

    const sub = this.vehicleService.getVehicle(this.rego_number)
      .subscribe(doc => {
        this.vehicles = doc
        console.log(this.vehicles)
        if (this.vehicles[0] == null && this.rego_number != null) {
          this.newNumberPlate = true
        } else {
          this.presentAlert('It seems this car is already registered.', 'Ooops 😳')
        }
      });
    this.subs.push(sub);
  }

  async presentAlert(message: string, header: string) {
    const alert = await this.alertController.create({
      header: `${header}`,
      message: `${message}`,
      buttons: ['OK']
    });

    await alert.present();
  }

  close() {
    this.router.navigateByUrl('car-list');
  }

  vehicleDB() {
    var vehicle = {
      rego_number: this.rego_number,
      state: this.state,
      car_type: this.car_type,
      colour: this.colour,
      qr_code: '123xxr3'
    }
    this.vehicleService.newVehicle(vehicle)
    this.vehicleService.setUserVehicle(vehicle, this.uid)
    this.vehicleService.setUserDefaultVehicle(vehicle, this.uid)
  }

  addVehicle() {
    if (this.rego_number == undefined || this.colour == undefined || this.car_type == undefined || this.state == undefined) {
      this.presentAlert('Please fill out all car details', 'Check answers 🖐')
      console.log(this.rego_number + this.colour + this.car_type + this.state)
    } else {
      this.vehicleDB()
    }
  }



}
