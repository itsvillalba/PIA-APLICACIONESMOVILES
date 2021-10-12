import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../servicios/auth.service';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
})
export class LogoutPage implements OnInit {

  constructor(public authService: AuthService,
    public navCtrl: NavController,
    public router: Router,
    private Afauth: AngularFireAuth) { 
    }

  
  ngOnInit() {
    this.authService.logout()
    this.router.navigate(['/menu']);
  }


}
