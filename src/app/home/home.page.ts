import { Component } from '@angular/core';

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

  constructor(private flashlight: Flashlight) { }

  ngOnInit(){

  }

  switch() {

  }

}
