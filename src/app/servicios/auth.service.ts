import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { promise} from 'protractor'
import { RegistroPage } from '../registro/registro.page';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private Afauth: AngularFireAuth, public alertController: AlertController,
    private router: Router) { }

  login(email: string, password: string)
  {
    return new Promise((resolve, rejected) => {
      this.Afauth.auth.signInWithEmailAndPassword(email,password).then(user => {
        resolve(user)
      }).catch(err => rejected(err));
    });
  }

  registro(email: string, password: string)
  {
    return new Promise((resolve, reject) => {
      this.Afauth.auth.createUserWithEmailAndPassword(email, password).then( res=>{
          resolve(res)
      }).catch(err=> {
        reject(err)
      })
    
    })
  }

  logout()
  {
    this.Afauth.auth.signOut().then(() =>{
      this.router.navigate(['/login'])
    })
  }

  getUserAuth()
  {
   return this.Afauth.authState
  }
}

