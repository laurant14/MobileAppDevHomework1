import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ItemService} from '../item.service';
import {Observable} from 'rxjs';
//import {FirebaseService} from '../services/firebase.service';
import {Menu} from 'Menu';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  menuList=[];
  private menu: Observable<Menu[]>;

  
  constructor(
    private router: Router,
    public itemService:ItemService) {
      this.menu=this.itemService.getMenus();
    }

    ngOnInit(): void{
      this.menu=this.itemService.getMenus();
    }

  clickedSearch(){
    console.log(" clicked me")
  }

  openAddProductPage(){
    console.log( "clicked me");
    this.router.navigate(["/add-product-page"]);
  }

  viewItem(item){
    this.router.navigate(["/product-detail-page",item])
  }

}
