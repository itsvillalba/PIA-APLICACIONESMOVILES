import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu/menu.service';
import { Router, ActivatedRoute} from '@angular/router';
import {Menu} from '../menu/menu.model'
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../servicios/auth.service';
import { GooglemapsComponent } from '../googlemaps/googlemaps.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detallemenu',
  templateUrl: './detallemenu.page.html',
  styleUrls: ['./detallemenu.page.scss'],
})
export class DetallemenuPage implements OnInit {

  latitud: number;
  longitud: number;
  
  
  idNegocio: number;
  menu: Menu;
  event: CustomEvent
  optionSelected: string;
  registroCompra: string;
  usuario: string
  sumaElemento: number = 0;
  costo: number = 3;
  pagoTotal: number = 0;
  buttonDisabled: boolean = true;
  buttonPlusDisabled: boolean = true;
  contactList: any[];
  precioFinal: any;
  recibe: string;
 
  constructor(private menuService: MenuService,
    private router: Router, private activateRouter: ActivatedRoute,
    private firestore: AngularFirestore, private authservice: AuthService,
    private modalController: ModalController
    ) { 
      
    }

  ngOnInit() {
/*OBTENER UID DE CADA USUARIO*/
/*por medio de user.id obtendo el id desde auth service/getuserAuth*/
    this.authservice.getUserAuth().subscribe(user => {
       this.usuario = user.uid
     
    })

    this.activateRouter.paramMap.subscribe(paramMap=>{
      this.idNegocio = Number.parseInt(paramMap.get('idNegocio'));
      this.menu = this.menuService.getReceta(this.idNegocio);
    });
  }


  changeSelect(event: CustomEvent){
    this.optionSelected = event.detail.value;
    console.log(event.detail.value);
    this.sumaElemento = 1;
    this.pagoTotal = this.menu.precio;
   
  }
  /***********/
 
 
  sumarElemento()
  { 
      this.sumaElemento++;
      this.pagoTotal = this.menu.precio*this.sumaElemento;
      this.buttonDisabled = false;
  }
 
  restarelemento(){
     
      this.sumaElemento--;
      this.pagoTotal = this.menu.precio *this.sumaElemento;
      if(this.sumaElemento == 0)
      {
        this.buttonDisabled = true;
      }
  }

  addElement()
  {
    /*
    const opcionSeleccionada =  {ingrediente: this.optionSelected, UID: this.usuario}
    this.firestore.collection('registroCompra').doc(this.usuario).set(opcionSeleccionada);
    */

    const opcionSeleccionada =  {ingrediente: this.optionSelected, UID: this.usuario, imagen: this.menu.imagen,
      pago: this.pagoTotal, cantidad: this.sumaElemento,
    recepcion: this.recibe}
    this.firestore.collection('registroCompra').add(opcionSeleccionada)
  }  

  deleteElement(){
    const opcionSeleccionada = {ingrediente: this.optionSelected, UID: this.usuario}
    this.firestore.collection('registroCompra').doc(this.usuario).ref.delete()
  }

  getContactList() {
 console.log(this.firestore.collection('registroCompra').doc(this.usuario).get());
  }
  


  


}
