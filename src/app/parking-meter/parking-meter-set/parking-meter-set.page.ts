import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MeterService } from '../../services/meter.service';
import { Meter } from '../../model/Meter';
import { VehicleService } from '../../services/vehicle.service'
import { Vehicle } from '../../model/Vehicle'
import { Parking } from '../../model/Parking'
import { ParkingService } from '../../services/parking.service'
import { AuthServiceService } from '../../services/auth-service.service';
import { Subscription } from 'rxjs';
import {Params, Router} from '@angular/router';
import { CarDefaultPage } from '../../car/car-default/car-default.page'
import { interval } from 'rxjs';
import { map } from 'rxjs/operators'
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import {FcmService} from "../../fcm.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-parking-meter-set',
  templateUrl: './parking-meter-set.page.html',
  styleUrls: ['./parking-meter-set.page.scss'],
})
export class ParkingMeterSetPage implements OnInit {

  @Input() value: any;
  minutes: number;
  price: number;
  time: number;
  maxTime: number;
  minTime: number;
  total: string;
  id: string;
  day: number;
  hour: any;
  council_id: string;
  meters: Meter[];
  meter: Meter;
  subs: Subscription[] = [];
  loaded: number;
  uid: string;
  vehicles: Vehicle[];
  vehicle: Vehicle;
  parking: Parking;
  milliSecond: number;
  fcmToken: string;
  alertTimer: number;


  currentHours: any;
  currentMinutes: any;
  currentSeconds: any;
  currentTimeString: any;
  endMilli: number;

  constructor(
    public modalController: ModalController,
    private meterService: MeterService,
    private router: Router,
    private vehicleService: VehicleService,
    private authService: AuthServiceService,
    private parkingService: ParkingService,
    private afs: AngularFirestore,
    private fcm: FcmService,
    private http: HttpClient
    ) { }

  ngOnInit() {
    this.minutes = 0
    this.total = "0.00"
    this.id = this.value
    this.loaded = 0
    this.auth()
    this.getFCM()
    this.getTodaysDay()
    this.getCurrentTime()
    this.getMeter()
  }

  getFCM() {
    this.fcmToken = this.fcm.token;
    if (!this.fcmToken) this.fcm.getToken()
        .then(() => {
          this.fcmToken = this.fcm.token;
        });
  }

  auth() {
    const sub = this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.uid = auth.uid;
        this.getDefaultVehicle();
        this.getVehicles()
      } else {
        this.router.navigate(['login'])
      }
    });
    this.subs.push(sub)
  }



  getDefaultVehicle() {
    const sub = this.vehicleService.getUserDefaultVehicle(this.uid)
      .subscribe(doc => {
        this.vehicle = doc
        console.log(this.vehicle)
      });
    this.subs.push(sub);
  }

  getVehicles() {
    const sub = this.vehicleService.getUserVehicles(this.uid)
      .subscribe(doc => {
        this.vehicles = doc
        console.log(this.vehicles)
      });
    this.subs.push(sub);
  }

  getTodaysDay() {
    var d = new Date();
    this.day = d.getDay()
  }

  getCurrentTime() {
    var d = new Date();
    this.hour = d.getHours();
    this.currentHours = d.getHours();
    this.currentMinutes = d.getMinutes();
    this.currentSeconds = d.getSeconds();
  }

  getMeterRatesDay() {
    if (this.day >= this.meter.peek.peak_date_from && this.day <= this.meter.peek.peak_date_to) {
      this.getMeterRatesTime()
    } else {
      //console.log(false)
    }
  }

  getMeterRatesTime() {
    if (this.hour >= this.meter.peek.peak_time_from && this.hour <= this.meter.peek.peak_time_to) {
      this.price = this.meter.peek.peak_rate
      this.maxTime = this.meter.peek.peak_max_time
      this.minTime = this.meter.peek.peak_min_time
    } else {
      console.log(false)
    }
  }

  add() {
    if (this.minutes != this.maxTime) {
      this.minutes = this.minutes + 5
      this.updatePrice(this.minutes)
      this.endMilli = new Date(this.milliSecond+1000*60*this.minutes).getTime();
      this.milliSecond = new Date().getTime();
      this.alertTimer = new Date(this.milliSecond+1000*60*(this.minutes-5)).getTime();

      //this.price = this.minutes * this.price
    }
  }

  subtract() {
    if (this.minutes != this.minTime) {
      this.minutes = this.minutes - 5
      this.updatePrice(this.minutes)
      this.endMilli = new Date(this.milliSecond+1000*60*this.minutes).getTime();
      this.milliSecond = new Date().getTime();
      this.alertTimer = new Date(this.milliSecond+1000*60*(this.minutes-5)).getTime();

    }
  }

  updatePrice(minutes) {
    var t1 = minutes * this.price
    this.total = t1.toFixed(2)
  }

  close() {
    this.modalController.dismiss();
  }

  async setDefault() {
    const modal = await this.modalController.create({
      component: CarDefaultPage,
      componentProps: { value: 'abc123' }
    });
    modal.onDidDismiss().then(i => {
    })
    return await modal.present();
  }

  getMeter() {

    const sub = this.meterService.getMeter(this.id)
      .subscribe(doc => {
        this.meters = doc
        this.meter = this.meters[0]
        this.loaded = 1
        //console.log(this.meters[0].peek.peak_date_from)
        this.getMeterRatesDay()
      });
    this.subs.push(sub);

  }

  startMeter() {
    // Get the date of booking in string format
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var d = new Date();
    var dd = d.getDate()
    var mm = months[d.getMonth()]
    var yy = d.getFullYear()
    var stringDate = dd + " " + mm + " " + yy;

    var parking = {
      time_from: this.milliSecond,
      time_to: this.endMilli,
      alert_time: this.alertTimer,
      total_cost: this.total,
      fcm: this.fcmToken,
    };

    var db = this.afs.collection(`parking`).doc(`${this.uid}`).collection('parkings').add(parking).then(doc => {
      this.startBackendTimer(doc.id)
        .then(() => {
          this.close();
          this.meterService.id = doc.id;
          this.router.navigate(['meter-started']);
        })
        .catch(error => {
            console.log(error.toString())
        })
    })
  }

  startBackendTimer(id: string) {
    return new Promise((resolve, reject) => {
      const body = {
        id,
        minutes: Math.ceil((this.endMilli - this.milliSecond) / (1000 * 60)),
        update: false,
        registration_id: this.fcmToken
      };

      this.http.post('https://us-central1-valett-71809.cloudfunctions.net/handleTimer', JSON.stringify(body))
          .subscribe(() => resolve(), error => resolve())
    });
  }
}
