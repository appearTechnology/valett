import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Flashlight } from '@ionic-native/flashlight/ngx';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  today: any
  data: any

  constructor(private router: Router, private flashlight: Flashlight) { }

  ngOnInit(){

  }

  switch() {
    console.log("haha");
    this.router.navigateByUrl('scanner');
  }

}
