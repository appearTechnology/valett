import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ParkingMeterSetPage } from '../parking-meter/parking-meter-set/parking-meter-set.page'

@Component({
  selector: 'page-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {

  scanSub: any;
  showCamera = true;
  showText = false;
  flashEnable = false;
  CameraEnabled = 1

  constructor(
    private router: Router,
    private qrScanner: QRScanner,
    private openNativeSettings: OpenNativeSettings,
    public alertController: AlertController,
    public menuCtrl: MenuController,
    public modalController: ModalController) {
    //this.CameraEnabled = 1
  }


  ngOnInit() {
    this.prepareCamera();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    this.CameraEnabled = 2
  }

  prepareCamera() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          console.log('Camera Permission Given');
          setTimeout(() => {
            this.CameraEnabled = 3
          }, 2000);
          this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
            if (this.showCamera) {
              //alert(text);
              if (text.length == 4) {
                this.presentModal()
              } else {
                alert("Sorry we could not match that, try again?");
                this.prepareCamera();
              }
            }
          });
          this.qrScanner.show();
        } else if (status.denied) {
          console.log('Camera permission denied');
          this.CameraEnabled = 2
          this.OpenSettings()
        } else {
          console.log('Permission denied for this runtime.');
          this.CameraEnabled = 2
          this.OpenSettings()
        }
      })
      .catch((e: any) => console.log('Error is', e))
      .catch((e: any) => {
        console.log('Error is', e);
        this.router.navigateByUrl('home');
        this.qrScanner.destroy();
        this.openNativeSettings.open("application_details");
      });
  }

  next() {
    this.presentModal()
  }

  switch() {
    if (this.showCamera) {
      this.showCamera = false;
      this.showText = true;
      this.qrScanner.hide();
    } else {
      this.showCamera = true;
      this.showText = false;
      this.prepareCamera();
    }
  }

  close() {
    this.router.navigateByUrl('landing');
    //this.modalCtrl.dismiss();
    this.qrScanner.destroy();
  }


  viewWillDisappear() {
    this.qrScanner.destroy();
  }

  flash() {
    if (!this.flashEnable) {
      this.qrScanner.enableLight();
      this.flashEnable = true;
    } else {
      this.qrScanner.disableLight();
      this.flashEnable = false;
    }
  }

  openSettings() {
    this.openNativeSettings.open("application_details");
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ParkingMeterSetPage,
      componentProps: { value: 'abc123' }
    });
    modal.onDidDismiss().then(i => {
      //this.close()
      this.prepareCamera();
    })
    return await modal.present();
  }

  async OpenSettings() {
    const alert = await this.alertController.create({
      header: '🖐',
      message: 'Please enable your camera settings',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.close()
          }
        }, {
          text: 'Open Settings',
          handler: () => {
            this.openSettings()
          }
        }
      ]
    });
    await alert.present();
  }
}
