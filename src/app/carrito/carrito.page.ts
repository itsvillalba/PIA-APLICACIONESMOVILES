import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu/menu.service';
import { Router, ActivatedRoute} from '@angular/router';
import {Menu} from '../menu/menu.model'
import { AngularFirestore,AngularFirestoreCollection  } from '@angular/fire/firestore';
import { AuthService } from '../servicios/auth.service';
import {CarritoService} from '../carrito/carrito.service'
import {CarritoModel } from '../carrito/carrito.model'
import { GooglemapsComponent } from '../googlemaps/googlemaps.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {


  latitud: number;
  longitud: number;
  usuario: string;
  productos: CarritoModel[] = [];
  optionSelected: string;
  recibido: string;
  docs: any;
  idDocs: any[];
  numero: string;
  constructor(private menuService: MenuService,
    private router: Router, private activateRouter: ActivatedRoute,
    private firestore: AngularFirestore, private authservice: AuthService,
  private carritoService: CarritoService, private modalController: ModalController) { }

  ngOnInit() {


    /*OBTENER UID DE CADA USUARIO*/
    this.authservice.getUserAuth().subscribe(user => {
      this.usuario = user.uid
    
      this.getOrdenes();
   
      
   })
    
/*OBTENER ID DE CADA DOCUMENTO ENCONTRADO EN LA COLECCIÓN DE FBASE*/
   this.carritoService.getDocs().subscribe((catsSnapshot) => {
    this.docs = [];
    catsSnapshot.forEach((catData: any) => {
      this.docs.push({
        id: catData.payload.doc.id,
        data: catData.payload.doc.data()
      });
      console.log(this.docs)
    })
  });
  /******* Se almacena en arreglo docs********* */



  }

getOrdenes()
{
  /*ALMACENA TODOS LOS DATOS DE X DOCUMENTO EN UN ARREGLO PARA MOSTRARLOS
  EN EL HTML COMO CARRITO DE COMPRA*/
  const path ='registroCompra/'
  this.carritoService.getCollectionParametro<CarritoModel>(path, 'UID', this.usuario).subscribe( (res:CarritoModel[] )=> {
  this.productos = res;

    console.log(res);
  
  })
}

  deleteElement(){
    const opcionSeleccionada = {UID: this.usuario}
    this.firestore.collection('registroCompra').doc().delete()
  }

  eliminarDocumento(id: string){

    const opcionSeleccionada = {UID: this.usuario}
    this.firestore.collection('registroCompra').doc(id).delete()
  }



  async addDirection(){
    let positionInput: any = {
      lat: -2.898116,
      lng: -78.99958149999999
    };
    if(this.latitud !== null){
      positionInput.lat = this.latitud;
      positionInput.lng = this.longitud;
    }


    const modalAdd = await this.modalController.create({
      component: GooglemapsComponent,
      mode: 'ios',
      swipeToClose: true,
      componentProps: {position: positionInput} 
    });

    await modalAdd.present();

    const {data} = await modalAdd.onWillDismiss();

    if(data){
      console.log('data->', data);
      //this.cli
      this.longitud = data.pos.lng;
      this.latitud = data.pos.lat;
      console.log('datos de ubiciacion actualizados, latitud: '+this.latitud+' \nlongitud:'+this.longitud);
    }
  }

}
