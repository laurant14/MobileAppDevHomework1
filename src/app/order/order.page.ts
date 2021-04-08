import { Component, OnInit } from '@angular/core';
import {Cart} from 'Menu';
import {ItemService} from '../item.service';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {Order} from 'Menu';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  private cart: Observable<Cart[]>;

  constructor(private router: Router,public itemService: ItemService,private activatedRoute: ActivatedRoute) { 
    this.cart=this.itemService.getCart();
  }

  ngOnInit() {
    console.log("tab1 page oninit");
      this.cart=this.itemService.getCart();
  }

}
