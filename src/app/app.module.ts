import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {AngularFirestoreModule} from 'angularfire2/firestore'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {environment} from 'src/environments/environment';
import { AngularFireModule } from 'angularfire2';
import {AngularFireAuth, AngularFireAuthModule} from 'angularfire2/auth';
import { SliderComponent } from './slider/slider.component';

@NgModule({
  declarations: [AppComponent, SliderComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
  AngularFireModule.initializeApp(environment.firebaseConfig),
  AngularFireAuthModule, AngularFirestoreModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  
  bootstrap: [AppComponent]
})
export class AppModule {}
