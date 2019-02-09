import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthServiceService } from '../../services/auth-service.service'
import { UserService } from '../../services/user.service';
import { User } from '../../model/User'
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  email: string;
  password: string;
  id: string;

  constructor(
    public menuCtrl: MenuController,
    private authService: AuthServiceService,
    private userService: UserService,
    public toastController: ToastController,
    private router: Router, ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
  }

  onSubmit({ valid, value }: { valid: boolean, value: User }) {
    if (!valid) {
      this.ErrorPresentToast()
    } else {
      this.authService.register(this.email, this.password).then(res => {
        this.registerUser(value)
        this.SuccessPresentToast()
        this.router.navigate(['create-profile']);

      }).catch(err => {
        this.FailErrPresentToast(err)
      })
    }
  }


  async ErrorPresentToast() {
   const toast = await this.toastController.create({
     message: 'Sorry we could not log you in, check signup details and try again',
     duration: 4000,
     position: 'top',
   });
   toast.present();
 }

 async SuccessPresentToast() {
  const toast = await this.toastController.create({
    message: 'You have succesfully created an account, welcome to OPENHOME 😁',
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

  registerUser(value) {

  value = {
    email: this.email,
    type: 'user',
    stage: 1,
  }
  this.authService.getAuth().subscribe(auth => {
    if (auth) {
      this.id = auth.uid
      this.userService.newClient(value, this.id);
      this.router.navigate(['home']);
    } else {
    }
  });
}

toLogin(){
  this.router.navigate(['login'])
}

}
