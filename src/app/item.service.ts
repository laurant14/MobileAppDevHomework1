import { Injectable } from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {IonicStorageModule} from '@ionic/storage';
import {Storage} from '@ionic/storage';
import {Menu} from 'Menu';
import {Order} from 'Menu';
import {Observable} from 'rxjs';
import {map,take} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase/app';
import { mainModule } from 'process';


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private menu: Observable<Menu[]>;
  private menuCollection: AngularFirestoreCollection<Menu>;

  private order: Observable<Order[]>;
  private orderCollection: AngularFirestoreCollection<Order>;

  usertype="";
  uid='';

  menuList=[{name:"Pasta",price: 5.50,url:"https://www.budgetbytes.com/wp-content/uploads/2013/07/Creamy-Tomato-Spinach-Pasta-V2-bowl.jpg", description:""},
  {name:"Soup",price: 5.50,url:"https://www.inspiredtaste.net/wp-content/uploads/2018/10/Homemade-Vegetable-Soup-Recipe-4-1200.jpg",description:""},
  {name:"Burger",price:15,url:"https://media1.s-nbcnews.com/j/newscms/2019_21/2870431/190524-classic-american-cheeseburger-ew-207p_d9270c5c545b30ea094084c7f2342eb4.fit-2000w.jpg", description:""},
  {name:"Fruit",price:9,url:"https://tastesbetterfromscratch.com/wp-content/uploads/2017/06/Fresh-Fruit-Bowl-1-768x1152.jpg", description:""},
  {name:"Cake",price:6.20,url:"https://images.immediate.co.uk/production/volatile/sites/2/2019/04/Choc-Fudge-Cake-b2d1909.jpg?webp=true&quality=90&crop=25px%2C1960px%2C5975px%2C2570px&resize=940%2C399",description:""},
]

orderList=[
  {id:1,quantity:10,date:'2021-2-10',amount:23.0},
  {id:2,quantity:10,date:'2021-2-10',amount:23.0},
]


  constructor(private firebase: AngularFirestore,
    public angularFire: AngularFireAuth) {
      this.orderCollection=this.firebase.collection<Order>('orders');
    this.menuCollection=this.firebase.collection<Menu>('menus');
    this.menu=this.menuCollection.snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data=a.payload.doc.data();
          console.log(data);
          const id=a.payload.doc.id;
          return {id, ...data};
        });
      })
    );

    this.order=this.orderCollection.snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data=a.payload.doc.data();
          console.log("Data...");
          console.log(data);
          const id=a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
   }

  //  load_my_orders(){
  //    var user=firebase.auth().currentUser;
  //    console.log(user.id);
  //    var id=user.id;
  //    this.orderCollection=this.firebase.collection<Order>('orders',ref=>ref.where('id', '==',id));
  //    this.order=this.orderCollection.snapshotChanges().pipe(
  //      map(actions=>{
  //        return actions.map(a=>{
  //          const data=a.payload.doc.data();
  //          const id=a.payload.doc.id;
  //          console.log(id)
  //          return {id,...data};
  //        });
  //      })
  //    );
  //    console.log("orders loaded...");
  //  }

  load_my_orders(){ //after user login, call this function
    var user = firebase.auth().currentUser;
    console.log(user.uid);
    var uid=user.uid;
    // this.noteCollection = this.afs.collection<Note>('notes');
    this.orderCollection = this.firebase.collection<Order>('orders',ref => ref.where('uid', '==', uid));

    this.order = this.orderCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            // console.log(data)
            const id = a.payload.doc.id;
            console.log(id)
            // console.log("run after aadding new node? ")
            return { id, ...data };
          });
        })
    );
    console.log("orders  loaded...")
  }

  setUID(uid){
    this.uid=uid;
    console.log(this.uid);
  }

  setUsertype(type){
    this.usertype=type;
  }

  getUsertype(){
    return this.usertype;
  }

  createItem(name, price, url, description){
    this.menuList.push({name, price, url, description});
   //this.storage.set('menuList', JSON.stringify(this.menuList));

    var db=this.firebase;
    
    db.collection("menus").add({
      name:name,
      price: price,
      url: url,
      description: description,
      
    })
    .then((docRef)=>{
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error)=>{
      console.error("Error adding document: ", error);
    });
  }

  // getOrderList(){
  //   return this.orderList;
  // }

  createOrder(item, quantityY){
    //this.orderList.push({item, quantity});
    var db=this.firebase;
    var d=new Date();
    var user = firebase.auth().currentUser;
    console.log(user.uid);
    var uid=user.uid;
    db.collection("orders").add({
      name: item.name,
      item: item,
      quantity: quantityY,
      date: d.toLocaleDateString(),
      amount:quantityY*item.price,
      uid:uid,
      //userid: this.angularFire.currentUser.uid,
    })
    .then((docRef)=>{
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error)=>{
      console.error("Error adding document: ", error);
    // });
    // console.log(item)
    // console.log(quantityY)
    // let orderid=Math.random()*(99999-10000)+10000;
    // var d=new Date();
    // this.orderList.push({
    //   id:orderid,
    //   quantity:quantityY,
    //   date: d.toLocaleDateString(),
    //   amount:quantityY*item.price
    // });
    });

}

getOrder(): Observable<Order[]>{
  return this.order;
}

getMenus(): Observable<Menu[]>{
  return this.menu;
}

getSingleMenu(id: string): Observable<Menu>{
  return this.menuCollection.doc<Menu>(id).valueChanges().pipe(
    take(1),
    map(menu=>{
      menu.id=id;
      return menu;
    })
  );
}

updateProductInfo(menu: Menu): Promise<void>{
  return this.menuCollection.doc(menu.id).update({name:menu.name,price:menu.price,url:menu.url,description:menu.description});
}

deleteItem(id: string){
  return this.menuCollection.doc(id).delete();

}

deleteOrder(id: string){
  return this.orderCollection.doc(id).delete();
}


}


