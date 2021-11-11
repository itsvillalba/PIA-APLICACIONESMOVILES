import { Injectable } from '@angular/core';
import {Menu} from './menu.model'

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  
  filterTerm: string;

  negocios: Menu[] =[

    {
      id:1,
      nombre:'il Bonle',
      imagen:'https://i.ytimg.com/vi/eOXHlDWJPcM/maxresdefault.jpg',
      descripcion: 'Hoy tenemos 2x1!',
      precio: '75.00',
      ingredientes: ['Hot Buffalo', 'BBQ', 'Mango Habanero'],
      costo:[70, 65, 60]
    },
    
    {id:2,
      nombre: 'Mariscos "El Ostión"',
      imagen:'https://cdn.shopify.com/s/files/1/0899/2262/articles/restaurantes-de-mariscos-y-otras-opciones-para-comer-en-cuaresma.jpg?v=1552671997',
      descripcion: 'Ricos mariscos para este fin de semana' ,
      precio: '60.00',
      ingredientes: ['Mojarra Frita', 'Ostion', 'Camarones', 'Filete a la plancha'],
      costo:[70, 65, 60]
    },
    {
      id:3,
      nombre: 'Carnes SOMAR',
      imagen:'https://saboryestilo.com.mx/wp-content/uploads/2020/01/tips-para-hacer-la-mejor-carne-asada-1200x720.jpg',
      descripcion: 'Las mejores carnes para su parrilla!',
      precio: '80.00',
      ingredientes: ['Rib-eye', 'T-Bone', 'Chicharrones'],
      costo:[70, 65, 60]
    },
    
    {
      id:4,
      nombre: 'Helados Snowday',
      imagen:'https://www.dondeir.com/wp-content/uploads/2016/07/helados1.jpg',
      descripcion: 'Deliciosos helados para refrescar su paladar',
      precio: '15.00',
      ingredientes: ['Chocolate', 'Vainilla', 'Fresa', 'De todo un poco'],
      costo:[70, 65, 60]
    }
    
    ]
    

  constructor() { }


  getReceta(idNegocios: number)
  {
    return {...this.negocios.find(
      (negocio: Menu) => {
        return negocio.id === idNegocios
      }
    )};
  }

  getRecetas()
  {
       return [...this.negocios];
  }

}
