import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ItemService} from '../item.service';
import {Observable} from 'rxjs';
//import {FirebaseService} from '../services/firebase.service';
import {Menu} from 'Menu';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  //menuList=[];
  private menu: Observable<Menu[]>;
  hideMe=true;

  
  constructor(
    private router: Router,
    public itemService:ItemService,
    public angularFire: AngularFireAuth) {
      this.menu=this.itemService.getMenus();
    }

    ngOnInit(): void{
      console.log("tab1 page oninit");
      this.menu=this.itemService.getMenus();
    }

    ionViewWillEnter() {
      console.log("enter home...")
      console.log(this.itemService.uid)
      if(this.itemService.uid == ''){
        this.hideMe=true;
      }
      else{
        this.hideMe=false;
      }
      console.log(this.hideMe)
    
  }

  clickedSearch(){
    console.log(" clicked me")
  }

  signIn(){
    this.router.navigate(["/signin"])
  }

  logout(){
    this.angularFire.signOut().then(()=>{
      console.log("logging off...");
      let user=this.angularFire.currentUser;
      console.log(user);
      this.router.navigate(["/"]);//back to tab1
    })
  }

  openAddProductPage(){
    console.log( "clicked me");
    this.router.navigate(["/add-product-page"]);
  }

  viewItem(item){
    this.router.navigate(["/product-detail-page",item])
  }

}
