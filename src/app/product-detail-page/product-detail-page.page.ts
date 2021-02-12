import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ItemService} from '../item.service';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.page.html',
  styleUrls: ['./product-detail-page.page.scss'],
})
export class ProductDetailPagePage implements OnInit {
  item=null
  order={quantity:1}


  constructor(public itemService:ItemService,private route:ActivatedRoute) { }

  ngOnInit() {
    console.log("OnInit");
    this.route.params.subscribe(
      param=>{
        this.item=param;
        console.log(this.item)
      }
    )
  }

  orderme(){
    console.log(this.order.quantity)
    this.itemService.createOrder(this.item,this.order.quantity)
  }

  change(){
    console.log(this.order.quantity)
    if(this.order.quantity>50){
      console.log('thats a lot')
    }
  }

}
