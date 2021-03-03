import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {IonicStorageModule} from '@ionic/storage';
import {AngularFireModule} from '@angular/fire';

const firebaseConfig = {
  apiKey: "AIzaSyBg4HHfh3xGmgvrR2R3E3s978GDD9yd3G8",
  authDomain: "uscstore-2234e.firebaseapp.com",
  projectId: "uscstore-2234e",
  storageBucket: "uscstore-2234e.appspot.com",
  messagingSenderId: "305973020404",
  appId: "1:305973020404:web:69cb3a8be97b9d4a4480a1",
  measurementId: "G-BKWGZW956Q"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AngularFireModule.initializeApp(firebaseConfig), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
