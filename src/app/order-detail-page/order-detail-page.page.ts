import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ItemService} from '../item.service';

@Component({
  selector: 'app-order-detail-page',
  templateUrl: './order-detail-page.page.html',
  styleUrls: ['./order-detail-page.page.scss'],
})
export class OrderDetailPagePage implements OnInit {
  order=null

  constructor(public itemService:ItemService,private route:ActivatedRoute) { }

  ngOnInit() {
    console.log("OnInit");
    this.route.params.subscribe(
      param=>{
      this.order=param;
      console.log(this.order)
    })
  }

  deleteOrder(){
    this.itemService.deleteOrder(this.order.id);
  }

  

}
