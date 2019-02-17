import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Vehicle } from '../model/Vehicle'

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  vehicleCollection: AngularFirestoreCollection<Vehicle>;
  vehicleDoc: AngularFirestoreDocument<Vehicle>;
  vehicles: Observable<Vehicle[]>;
  vehicle: Observable<Vehicle>;

  constructor(private afs: AngularFirestore) { }

  getVehicle(id) {

  this.vehicleCollection = this.afs.collection<Vehicle>('vehicles', ref => ref.where('rego_number', '==', `${id}`))
  this.vehicles = this.vehicleCollection.snapshotChanges().pipe(
    map(actions => actions.map(a => {
      if(a.payload.doc.exists == false){
        return null
      } else {
        const data = a.payload.doc.data() as Vehicle;
        const id = a.payload.doc.id;
        return { id, ...data };
      }

    }))
  );
  return this.vehicles
  }

  newVehicle(vehicle: Vehicle, id: string) {
    var db = this.afs.collection(`vehicle`).doc(`${id}`).set(vehicle)
  }
}
