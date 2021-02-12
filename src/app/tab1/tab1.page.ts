import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ItemService} from '../item.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  menuList=[];

  
  constructor(private router: Router,
    public itemService:ItemService) {
      this.menuList=this.itemService.getItem();
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
