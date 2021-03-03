import { Injectable } from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {IonicStorageModule} from '@ionic/storage';
import {Storage} from '@ionic/storage';
import {Menu} from 'Menu';
import {Observable} from 'rxjs';
import {map,take} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private menu: Observable<Menu[]>;
  private menuCollection: AngularFirestoreCollection<Menu>;

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


  constructor(private firebase: AngularFirestore) {
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

  getOrderList(){
    return this.orderList;
  }

  createOrder(item, quantityY){
    console.log(item)
    console.log(quantityY)
    let orderid=Math.random()*(99999-10000)+10000;
    var d=new Date();
    this.orderList.push({
      id:orderid,
      quantity:quantityY,
      date: d.toLocaleDateString(),
      amount:quantityY*item.price
    });

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
deleteItem(id){

}
}

