import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

import { AuthService } from '../servicios/auth.service';
import {Menu} from './menu.model'
import { RouterModule } from '@angular/router';
import { MenuService } from './menu.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})

@Injectable({
  providedIn: 'root'
})
export class MenuPage implements OnInit {
  negocios: Menu[];
  filterTerm: string;
  


  constructor(public authService: AuthService, private menu: MenuController,
    public navCtrl: NavController,
    private menuService: MenuService) { }

  ngOnInit() {

    this.negocios = this.menuService.getRecetas();
  }

  /* dejar este metodo*/
OnLogOut(){
  this.authService.logout()
}

}
