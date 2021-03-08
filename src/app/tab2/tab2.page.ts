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

  private order: Observable<Order[]>;

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
 // orderimg = 'https://i.pinimg.com/564x/c1/73/98/c17398f6af7af7cfe942a8b549eed534.jpg';
  //login: any = { username: '', password: '',fname:'',lname:'' };
  
  isAdmin=false;
  constructor(private router: Router,public itemService: ItemService,private activatedRoute: ActivatedRoute) {
    //this.order = this.itemService.getOrder();
  }

  ngOnInit(): void{

    // var user1 = firebase.auth().currentUser;
    // console.log("Current User: ");
		// console.log(user1.uid);
    // console.log("tab2 oninit");
    this.order=this.itemService.getOrder();
    
  }

  ngAfterViewInit(): void {
    // const id = this.activatedRoute.snapshot.paramMap.get('id');
    // if (id) {
    //   this.itemService.getOrder(id).subscribe(orderData => {
    //     this.order = orderData;
    //   });
    // }
    this.itemService.load_my_orders();
  }
  
  // clickme(){
  // 	console.log(this.login.fname)
  // 	console.log(this.login.lname)
  // }

  viewOrder(order){
    this.router.navigate(["/order-detail-page",order]);
  }

}
