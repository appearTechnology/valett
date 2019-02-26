import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import {FCM } from '@ionic-native/fcm/ngx';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


export interface Detail {
  time_from: number
  time_to: number
  alert_time: number
  total_cost: string
  fcm: string
}

@Component({
  selector: 'app-meter-started',
  templateUrl: './meter-started.page.html',
  styleUrls: ['./meter-started.page.scss'],
})
export class MeterStartedPage implements OnInit {

  uid: string;
  subs: Subscription[] = [];
  array: Detail[] = null;
  alertTime: number = 0;

  constructor(private afs: AngularFirestore,
    private authService: AuthServiceService,
    private router: Router,
    ) { }

  ngOnInit() {
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



}
