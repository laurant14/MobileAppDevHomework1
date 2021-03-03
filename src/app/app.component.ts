import { Component } from '@angular/core';
import {Platform} from '@ionic/angular';

import {AngularFireModule} from '@angular/fire';
import {AngularFirestore} from '@angular/fire/firestore';
import { timeStamp } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    public firebase: AngularFirestore
  ) {
    this.initializeApp();
  }
  initializeApp(){
    this.platform.ready().then(()=>{


      // var db=this.firebase;

      // db.collection("menus").add({
      //   text:"Panda Fried Rice",
      //   description: "too yummy",
      //   price: 75.14
      // })
      // .then((docRef)=>{
      //   console.log("Document written with ID: ", docRef.id);
      // })
      // .catch((error)=>{
      //   console.error("Error adding document: ", error);
      // });
    })
  }


}
