import { Component, OnInit } from '@angular/core';

import { MenuElement } from './menu.model';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {


  constructor(private router: Router,
    public authService: AuthService) { }

  datosMenu: MenuElement[] =[
    {nombre: 'Órdenes',enlace:'/carrito',
    icono:'restaurant-outline'},
    {nombre: 'Nosotros',enlace:'/acercade',
    icono:'information-circle-outline'},
    

  ];



  ngOnInit() {}

  navegar(link: string){
    this.router.navigate([link]);
  }

  OnLogOut(){
    this.authService.logout()
  }


}
