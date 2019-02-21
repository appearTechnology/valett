import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service'
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ForgotPasswordPage } from '../forgot-password/forgot-password.page'
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(
    private authService: AuthServiceService,
    public toastController: ToastController,
    private router: Router,
    public modalController: ModalController,
    public menuCtrl: MenuController,
  ) {
    this.authService.getAuth().subscribe(auth => {
      console.log('auto', auth)
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
  }

  onSubmit({ valid }: { valid: boolean }) {
    if (!valid) {
      this.ErrorPresentToast()
    } else {
      this.authService.login(this.email, this.password).then(res => {
        this.SuccessPresentToast()
        this.router.navigate(['home']);
      }).catch(err => {
        this.FailErrPresentToast(err)
      })
    }
  }


  async ErrorPresentToast() {
    const toast = await this.toastController.create({
      message: 'Sorry we could not log you in, check signup details and try again',
      duration: 3000,
      position: 'top',
    });
    toast.present();
  }


  async SuccessPresentToast() {
    const toast = await this.toastController.create({
      message: 'You have successfully been logged in 😁',
      duration: 4000,
      position: 'top',
    });
    toast.present();
  }

  async FailErrPresentToast(err: any) {
    const toast = await this.toastController.create({
      message: `${err}`,
      duration: 4000,
      position: 'top',
    });
    toast.present();
  }

  toSignUp() {
    this.router.navigate(['signup'])
  }

  forgotPassword() {
    this.presentForgotPassword()
  }

  async presentForgotPassword() {
    const modal = await this.modalController.create({
      component: ForgotPasswordPage,
    });
    return await modal.present();
  }

}
