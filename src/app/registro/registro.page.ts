import { Component, OnInit,ViewChild } from '@angular/core';
import{
  FormGroup,
  FormControl, 
  Validators,
  FormBuilder
} from '@angular/forms'
import { AlertController } from '@ionic/angular';
import {AuthService} from '../servicios/auth.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public email: string;
  public password: string;


  

  constructor(private fb: FormBuilder, private alertController: AlertController,
    public auth: AuthService, public router: Router) {

    

   }

  ngOnInit() {
  }

OnSubmitRegister()
{
  this.auth.registro(this.email, this.password).then( async auth=> {
    this.router.navigate(['/menu'])
    console.log(auth)
    const alert = await this.alertController.create({
      message: 'Cuenta creada con éxito',
      buttons: ['Aceptar']
    });
    await alert.present();
  }).catch(async err => {
    console.log(err)
    const alert = await this.alertController.create({
      header: 'Datos incorrectos',
      message: 'Usuario ya existe, intente de nuevo',
      buttons: ['Aceptar']
    });
    await alert.present();
  })
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
