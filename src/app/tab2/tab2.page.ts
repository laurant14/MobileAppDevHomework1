import { Component} from '@angular/core';
import {ItemService} from '../item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page{
  img_url='assets/pizza.jpg';
  fname="";
  lname='';
  text='';
  orders=[];
  orderimg = 'https://i.pinimg.com/564x/c1/73/98/c17398f6af7af7cfe942a8b549eed534.jpg';
  login: any = { username: '', password: '',fname:'',lname:'' };
  constructor(private router: Router,public itemService: ItemService) {
    this.orders = this.itemService.getOrderList();
    

  }
  
  clickme(){
  	console.log(this.login.fname)
  	console.log(this.login.lname)
  }

  viewOrder(order){
    this.router.navigate(["/order-detail-page",order]);
  }

}
