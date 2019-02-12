import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-parking-meter-set',
  templateUrl: './parking-meter-set.page.html',
  styleUrls: ['./parking-meter-set.page.scss'],
})
export class ParkingMeterSetPage implements OnInit {

  minutes: number;
  price: number;
  time: number;
  maxTime: number;
  minTime: number;
  total: any;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    this.minutes = 0
    this.maxTime = 160
    this.minTime = 0
    this.price = 0.083
    this.total = 0.00


  }

  add(){
    if(this.minutes != this.maxTime){
      this.minutes = this.minutes + 5

      this.updatePrice(this.minutes)
      //this.price = this.minutes * this.price
    }
  }

  subtract(){
    if(this.minutes != this.minTime){
      this.minutes = this.minutes - 5
      this.updatePrice(this.minutes)
    }
  }

  updatePrice(minutes){
    var t1 = minutes * this.price
    this.total = t1.toFixed(2)
  }

  close() {
    this.modalController.dismiss();
  }

}
