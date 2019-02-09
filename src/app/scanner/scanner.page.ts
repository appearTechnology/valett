import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

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
  CameraEnabled = 2
  public lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 1;


  constructor(
    private router: Router,
    private qrScanner: QRScanner,
    private openNativeSettings: OpenNativeSettings,
    public alertController: AlertController,
    public menuCtrl: MenuController, ) {

    this.lottieConfig = {
      path: '../../assets/animations/qr-scan.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    };
}

handleAnimation(anim: any) {
  this.anim = anim;
}

ngOnInit() {
  //  this.prepareCamera();
  //this.OpenSettings()
  this.anim.play();
}

ionViewWillEnter() {
  this.menuCtrl.enable(false);
}

ionViewDidEnter() {
  this.prepareCamera();
}

prepareCamera() {
  this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        console.log('Camera Permission Given');
        this.CameraEnabled = 3
        this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
          console.log('Scanned something', text);
          if (this.showCamera) {
            alert(text);
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

switch () {
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
  this.router.navigateByUrl('home');
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
