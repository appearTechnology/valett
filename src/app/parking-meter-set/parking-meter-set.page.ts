import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MeterService } from '../services/meter.service'
import { Meter } from '../model/Meter'
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


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
  total: any;
  id: string;
  day: number;
  hour: any;
  council_id: string;
  meters: Meter[];
  meter: Meter;
  subs: Subscription[] = [];
  loaded: number;

  constructor(
    public modalController: ModalController,
    private meterService: MeterService,
    private router: Router, ) { }

  ngOnInit() {
    this.minutes = 0
    this.total = 0.00
    this.id = this.value
    this.loaded = 0
    this.getTodaysDay()
    this.getCurrentTime()
    this.getMeter()

  }

  getTodaysDay() {
    var d = new Date();
    this.day = d.getDay()
  }

  getCurrentTime() {
    var d = new Date();
    this.hour = d.getHours();

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
      //console.log(true)
      //console.log(this.hour)
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
      //this.price = this.minutes * this.price
    }
  }

  subtract() {
    if (this.minutes != this.minTime) {
      this.minutes = this.minutes - 5
      this.updatePrice(this.minutes)
    }
  }

  updatePrice(minutes) {
    var t1 = minutes * this.price
    this.total = t1.toFixed(2)
  }

  close() {
    this.modalController.dismiss();
    //this.router.navigateByUrl('parking-meter-set');
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


}
