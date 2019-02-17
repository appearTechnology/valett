import { Component, OnInit } from '@angular/core';
import { Platform, MenuController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.page.html',
  styleUrls: ['./car-list.page.scss'],
})
export class CarListPage implements OnInit {

  addVehicle: boolean

  constructor(
    public menuCtrl: MenuController,
    private router: Router, ) { }

  ngOnInit() {
    this.addVehicle = false
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
