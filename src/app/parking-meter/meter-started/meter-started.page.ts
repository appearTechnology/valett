import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthServiceService } from '../../services/auth-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';
import {MeterService} from "../../services/meter.service";


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
  alertTime = '';
  timeFrom: number = 0;
  timeTo: number = 0;

  constructor(private afs: AngularFirestore,
    private authService: AuthServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private meterService: MeterService
    ) { }

  ngOnInit() {
    this.auth();
  }

  auth() {
    const sub = this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.uid = auth.uid;
        this.updateTimer(this.meterService.id);
      } else {
        this.router.navigate(['login'])
      }
    });
    this.subs.push(sub)
  }

  updateTimer(id: string) {
    console.log(id);
    var db = this.afs
        .collection(`parking`)
        .doc(`${this.uid}`)
        .collection('parkings')
        .doc(`${id}`)
        .valueChanges()
        .subscribe((doc: any) => {
          this.timeFrom = doc.time_from;
          this.timeTo = doc.time_to;
          this.updateTimerView();
        });
  }

  updateTimerView() {
    const interval = setInterval(() => {
      const now = (new Date).getTime();
      const remaining = this.timeTo - now;

      if (remaining <= 0) {
        clearInterval(interval);
        return;
      }

      this.alertTime = this.millisToMinutesAndSeconds(remaining);
    }, 1000);
  }

  millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0) as any;
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
}
