import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/User'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userCollection: AngularFirestoreCollection<User>;
  userDoc: AngularFirestoreDocument<User>;
  users: Observable<User[]>;
  user: Observable<User>;

  constructor(
    private afs: AngularFirestore
  ) { }

  newClient(user: User, id: string) {
    var db = this.afs.collection(`users`).doc(`${id}`).set(user)
  }

  updateUser(user: User, id: string) {
    this.userDoc = this.afs.doc(`users/${id}`);
    this.userDoc.update(user);
  }
}
