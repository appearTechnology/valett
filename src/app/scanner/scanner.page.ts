import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Router } from '@angular/router';

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

  constructor(private router: Router, private qrScanner: QRScanner) { }

  ngOnInit() {
    this.prepareCamera();
  }

  prepareCamera() {

    this.showCamera = true;
    this.showText = false;

    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        console.log('Camera Permission Given');
        this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
          console.log('Scanned something', text);
          alert(text);
        });
        this.qrScanner.show();
      } else if (status.denied) {
        console.log('Camera permission denied');
      } else {
        console.log('Permission denied for this runtime.');
      }
    })
    .catch((e: any) => console.log('Error is', e));
  }

  showTextBox() {
    this.showCamera = false;
    this.showText = true;

  }

  close() {
    this.router.navigateByUrl('home');
  }

  flash(){
    if (!this.flashEnable) {
      this.qrScanner.enableLight();
      this.flashEnable = true;
    } else {
      this.qrScanner.disableLight();
      this.flashEnable = false;
    }
  }
}
