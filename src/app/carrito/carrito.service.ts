import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(private firestore: AngularFirestore, private authservice: AuthService) { }


  /* extracción de todos los datos de un documento usando condición WHERE*/
  getCollectionParametro<tipo>(path: string, parametro: string, value: string)
  {
    const dataCollection: AngularFirestoreCollection<tipo> = 
    this.firestore.collection<tipo>(path
      , ref => ref.where(parametro, '==', value));
      return dataCollection.valueChanges();
  }

}

