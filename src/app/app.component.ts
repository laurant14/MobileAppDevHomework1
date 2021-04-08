import { Component } from '@angular/core';
import {Platform} from '@ionic/angular';

import {AngularFireModule} from '@angular/fire';
import {AngularFirestore} from '@angular/fire/firestore';

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

    })
  }


}
