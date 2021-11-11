import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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


  deleteDoc(path:string, id: string)
  {
    const collection = this.firestore.collection(path);
    return collection.doc(id).delete();
  }

  getDocs() {
    return this.firestore.collection('registroCompra').snapshotChanges();
  }

}

