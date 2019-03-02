import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';


@Injectable()
export class FcmService {
  token: string;

  constructor(
      public firebaseNative: Firebase,
      public afs: AngularFirestore,
      private platform: Platform
  ) {}

  // Get permission from the user
  async getToken() {
    let token;

    if (this.platform.is('android')) {
      token = await this.firebaseNative.getToken();
      console.log(token);
    } else if (this.platform.is('ios')) {
      token = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
      console.log(token);
    } else {
      token = await this.firebaseNative.getToken();
      console.log(token);
    }

    return this.saveTokenToFirestore(token)
  }

  // Save the token to firestore
  private saveTokenToFirestore(token) {
    if (!token) return;

    this.token = token;
  }

  // Listen to incoming FCM messages
  listenToNotifications() {}

}
