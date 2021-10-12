import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';
import {AngularFirestore} from 'angularfire2/firestore'

import{
  FormGroup,
  FormControl, 
  Validators,
  FormBuilder
} from '@angular/forms'
import { AlertController, MenuController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
/******* */
email: string;
password: string;

/*** */
  constructor( public alertController: AlertController,
    private authService: AuthService, public router: Router,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
     public firestore: AngularFirestore) {    
   }

  ngOnInit() {
  
  }
 
  
ionViewDidEnter() {
  // the root left menu should be disabled on this page
  this.menuCtrl.enable(false);
}

ionViewWillLeave() {
  // enable the root left menu when leaving this page
  this.menuCtrl.enable(true);
}

   onSubmitLogin()
  {
  
   this.authService.login(this.email, this.password).then(res =>{
    this.router.navigate(['/menu']);
   }).catch (async err=> {
   const alert = await this.alertController.create({
    header: 'Datos incorrectos',
    message: 'Por favor, ingrese correo y/o contraseña',
    buttons: ['Aceptar']
  });
 await alert.present();
          }
    )/*termina catch*/

}

  
  /* Este apartado es el "método" agregado para la funcionalidad
  de la visualización opcional de nuestra contraseña
#passwordEyeRegister*/

  @ViewChild('passwordEyeRegister') passwordEye;
// Seleccionamos el elemento con el nombre que le pusimos con el #
passwordTypeInput  =  'password';
// Variable para cambiar dinamicamente el tipo de Input que por defecto sera 'password'
iconpassword  =  'eye-off';

// Esta función verifica si el tipo de campo es texto lo cambia a password y viceversa, además verificara el icono si es 'eye-off' lo cambiara a 'eye' y viceversa
togglePasswordMode() {
    this.passwordTypeInput  =  this.passwordTypeInput  ===  'text'  ?  'password'  :  'text';
    this.iconpassword  =  this.iconpassword  ===  'eye-off'  ?  'eye'  :  'eye-off';
    this.passwordEye.el.setFocus();
}

/*-------------------------------------------------*/

}
