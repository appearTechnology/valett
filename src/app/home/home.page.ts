import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { Flashlight } from '@ionic-native/flashlight/ngx';

import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  today: any
  data: any

  constructor(
    private router: Router,
    private flashlight: Flashlight,
    public menuCtrl: MenuController,
    private authService: AuthServiceService, ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {

  }

  switch() {
    console.log("haha");
    this.router.navigateByUrl('scanner');
  }

  logout() {
    this.authService.logout();
    this.router.navigate([''])
  }

}
