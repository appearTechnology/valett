import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Flashlight } from '@ionic-native/flashlight/ngx';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';


import { AngularFireModule } from 'angularfire2'
import { environment } from '../environments/environment'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFirestoreModule } from 'angularfire2/firestore'

import { ForgotPasswordPageModule } from './auth/forgot-password/forgot-password.module'

import { LottieAnimationViewModule } from 'ng-lottie';
//import { LoaderFlowComponent } from './components/loader-flow/loader-flow.component';
import { ComponentsModule } from './components/components.module'
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'valett'),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ForgotPasswordPageModule,
    LottieAnimationViewModule.forRoot(),
    ComponentsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Flashlight,
    Geolocation,
    QRScanner,
    OpenNativeSettings,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
