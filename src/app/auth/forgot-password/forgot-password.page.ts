import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth'
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  email: string;

  constructor(
    public menuCtrl: MenuController,
    private afAuth: AngularFireAuth,
    public toastController: ToastController,
    private modalCtrl: ModalController
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
  }

  onSubmit() {
    this.afAuth.auth.sendPasswordResetEmail(this.email)
      .then(() =>
        this.passwordSuccess()

      ).catch(() => this.error());
  }

  async passwordSuccess() {
    const toast = await this.toastController.create({
      message: 'You password has been successfully reset, please check your email 😁',
      duration: 3000,
      position: 'top',
    });
    toast.present();
    this.modalCtrl.dismiss();
  }

  async error() {
    const toast = await this.toastController.create({
      message: 'An error occured! Please check email again',
      duration: 4000,
      position: 'top',
    });
    toast.present();
  }

  close() {
    this.modalCtrl.dismiss();
  }

}
