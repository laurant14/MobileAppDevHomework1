import { getTranslationDeclStmts } from '@angular/compiler/src/render3/view/template';
import { Injectable } from '@angular/core';
import { createBrotliDecompress } from 'zlib';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  menuList=[{name:"Pasta",price: 5.50,quantity: 209,src:"https://www.budgetbytes.com/wp-content/uploads/2013/07/Creamy-Tomato-Spinach-Pasta-V2-bowl.jpg"},
  {name:"Soup",price: 5.50,quantity: 209,src:"https://www.inspiredtaste.net/wp-content/uploads/2018/10/Homemade-Vegetable-Soup-Recipe-4-1200.jpg"},
  {name:"Burger",price:15,quantity:145,src:"https://media1.s-nbcnews.com/j/newscms/2019_21/2870431/190524-classic-american-cheeseburger-ew-207p_d9270c5c545b30ea094084c7f2342eb4.fit-2000w.jpg"},
  {name:"Fruit",price:9,quantity:13,src:"https://tastesbetterfromscratch.com/wp-content/uploads/2017/06/Fresh-Fruit-Bowl-1-768x1152.jpg"},
  {name:"Cake",price:6.20,quantity:46,src:"https://images.immediate.co.uk/production/volatile/sites/2/2019/04/Choc-Fudge-Cake-b2d1909.jpg?webp=true&quality=90&crop=25px%2C1960px%2C5975px%2C2570px&resize=940%2C399"},
]

orderList=[
  {id:1,quantity:10,date:'2021-2-10',amount:23.0},
  {id:2,quantity:10,date:'2021-2-10',amount:23.0},
]


  constructor() { }


  createItem(name, price, quantity, src){
    this.menuList.push({name:name,price:2.5,quantity:15, src:src});
  }

  getOrderList(){
    return this.orderList;
  }

  createOrder(item, quantityY){
    console.log(item)
    console.log(quantityY)
    let orderid=Math.random()*(99999-10000)+10000;
    var d=new Date();
    var dates=d.getDate().toString();
    this.orderList.push({
      id:orderid,
      quantity:quantityY,
      date:dates,
      amount:quantityY*item.price
    });

}

getItem(){
  return this.menuList;
}

deleteItem(id){

}
}

