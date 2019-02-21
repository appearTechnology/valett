import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Parking } from '../model/Parking'

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  parkingCollection: AngularFirestoreCollection<Parking>;
  meterDoc: AngularFirestoreDocument<Parking>;
  meters: Observable<Parking[]>;
  meter: Observable<Parking>;

  constructor(private afs: AngularFirestore) { }

  setMeter(parking) {
    var db = this.afs.collection(`parking`).add(parking).then(i => {
      //this.router.navigate(['meter-started'])
      //  this.close()
      return i
    })
  }
}
