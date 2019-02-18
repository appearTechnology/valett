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
        if (a.payload.doc.exists == false) {
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

  getUserVehicles(id) {
    this.vehicleCollection = this.afs.collection<Vehicle>(`user_vehicles/${id}/vehicles_list`)
    this.vehicles = this.vehicleCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        if (a.payload.doc.exists == false) {
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

  getUserDefaultVehicle(id){
    this.vehicleDoc = this.afs.doc<Vehicle>(`user_vehicles/${id}`);
    this.vehicle = this.vehicleDoc.snapshotChanges().pipe(map(action => {
    if (action.payload.exists === false) {
      return null;
    } else {
      const data = action.payload.data() as Vehicle;
      data.id = action.payload.id;
      return data;
    }
  }));
  return this.vehicle
  }


  setUserVehicle(vehicle: Vehicle, id: string) {
    var db = this.afs.collection(`user_vehicles`).doc(`${id}`).collection('vehicles_list').add(vehicle)
  }

  setUserDefaultVehicle(vehicle: Vehicle, id: string) {
    var db = this.afs.collection(`user_vehicles`).doc(`${id}`).set(vehicle)
  }

  newVehicle(vehicle: Vehicle) {
    var db = this.afs.collection(`vehicles`).add(vehicle)
  }
}
