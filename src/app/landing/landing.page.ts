import { Component, OnInit } from '@angular/core';
import { Platform, MenuController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(
    public menuCtrl: MenuController,
    private router: Router, ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
  }

  openMenu() {
    this.menuCtrl.open();
  }

  switch() {
    this.router.navigateByUrl('scanner');
  }


}
