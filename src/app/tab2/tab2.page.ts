import { AfterViewInit, Component, OnInit} from '@angular/core';
import {ItemService} from '../item.service';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {Order} from 'Menu';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import {ActivatedRoute} from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, AfterViewInit{

 // private order: Observable<Order[]>;
  order=null;

  // order: Order = {
  //   id: '',
  //   //quantity: '',
  //   date: '',
  //   //price: '',
  //   uid:''
  // };
  //img_url='assets/pizza.jpg';
  // fname="";
  // lname='';
  // text='';
  
  //orders=[];
  orderimg = 'https://i.pinimg.com/originals/62/86/68/6286683aab458fb44bc2e156cb16e60a.png'; 
   
  //login: any = { username: '', password: '',fname:'',lname:'' };
  
  isAdmin=false;
  constructor(private router: Router,public itemService: ItemService,private activatedRoute: ActivatedRoute) {
    this.order = this.itemService.getOrder();
    //this.itemService.load_my_orders();
    //console.log(this.order.);
    
  }

  ngOnInit(): void{

    // var user1 = firebase.auth().currentUser;
    // console.log("Current User: ");
		// console.log(user1.uid);
    // console.log("tab2 oninit");
    //orderimg = this.order.url;
    //this.order=this.itemService.getOrder();
    this.itemService.load_my_orders();
    
  }

  ngAfterViewInit(): void {
    // const id = this.activatedRoute.snapshot.paramMap.get('id');
    // if (id) {
    //   this.itemService.getOrder(id).subscribe(orderData => {
    //     this.order = orderData;
    //   });
    // }
    //this.itemService.load_my_orders();
  }
  

  viewOrder(order){
    this.router.navigate(["/order-detail-page",order]);
  }

  checkout(){
    console.log("Checking out");
    this.itemService.createCart(this.order,this.order.quantity);
    this.router.navigate(["/order"]);
  }

}
