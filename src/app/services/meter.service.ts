import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Meter } from '../model/Meter'

@Injectable({
  providedIn: 'root'
})
export class MeterService {

  meterCollection: AngularFirestoreCollection<Meter>;
  meterDoc: AngularFirestoreDocument<Meter>;
  meters: Observable<Meter[]>;
  meter: Observable<Meter>;
  id: string;

  constructor(private afs: AngularFirestore) { }


  getMeter(id) {
    this.meterCollection = this.afs.collection<Meter>('meters', ref => ref.where('council_id', '==', `${id}`))
    this.meters = this.meterCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        if (a.payload.doc.exists == false) {
          return null
        } else {
          const data = a.payload.doc.data() as Meter;
          const id = a.payload.doc.id;
          return { id, ...data };
        }

      }))
    );
    return this.meters
  }

  setMeter(meter) {
    var db = this.afs.collection(`vehicles`).add(meter)
  }


}
