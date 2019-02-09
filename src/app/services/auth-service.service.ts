import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import { map } from 'rxjs/operators';
import { AngularFirestore } from "angularfire2/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore) {
  }

  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(userData =>
        resolve(userData),
        err => reject(err));
    })
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then(userData =>
        resolve(userData),
        err => reject(err));
    })
  }

  getAuth() {
    return this.afAuth.authState.pipe(map(auth => auth))
  }


  logout() {
    this.afAuth.auth.signOut()
  }

  forgotPassword(email: string) {
    this.afAuth.auth.sendPasswordResetEmail(email)
  }

}
