import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-check-auth',
  templateUrl: './check-auth.page.html',
  styleUrls: ['./check-auth.page.scss'],
})
export class CheckAuthPage implements OnInit {

  subs: Subscription[] = [];

  constructor(
    private authService: AuthServiceService,
    private router: Router, ) { }

  ngOnInit() {
    this.auth()
  }

  auth() {
    const sub = this.authService.getAuth().subscribe(auth => {
      if (auth) {
        //this.router.navigate(['home'])
      } else {
      //  this.router.navigate(['login'])
      }
    });
    this.subs.push(sub)
  }

}
