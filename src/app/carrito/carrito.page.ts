import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu/menu.service';
import { Router, ActivatedRoute} from '@angular/router';
import {Menu} from '../menu/menu.model'
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../servicios/auth.service';
import {CarritoService} from '../carrito/carrito.service'
import {CarritoModel } from '../carrito/carrito.model'

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  usuario: string;
  productos: CarritoModel[] = [];

  
  constructor(private menuService: MenuService,
    private router: Router, private activateRouter: ActivatedRoute,
    private firestore: AngularFirestore, private authservice: AuthService,
  private carritoService: CarritoService) { }

  ngOnInit() {


    /*OBTENER UID DE CADA USUARIO*/
    this.authservice.getUserAuth().subscribe(user => {
      this.usuario = user.uid

      this.getOrdenes();
   })
    
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

}
