import { Component, OnInit } from '@angular/core';
//import { ActivatedRoute } from '@angular/router';
import {ItemService} from '../item.service';
import {AlertController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
//import {FirebaseService} from '../services/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.page.html',
  styleUrls: ['./product-detail-page.page.scss'],
})
export class ProductDetailPagePage implements OnInit {
  item=null
  order={quantity:1}

  user:any;
  isStoreOwner=false;

  constructor(public itemService:ItemService,
    private route:ActivatedRoute, 
    private router: Router,
    public alertController: AlertController,
    public afAuth: AngularFireAuth) { }

  ngOnInit() {
    console.log("OnInit product detail page");
    this.route.params.subscribe(
      param=>{
        this.item=param;
        console.log(this.item)
      }
    )
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        // logged in or user exists
        console.log(user.email,user.uid);
        this.user=user;
      }
      else {
        // not logged in
        this.user=""
      }
    })
  }
  showme=false;
  ionViewWillEnter() {
    console.log("enter home...")
    console.log(this.itemService.usertype)
    if(this.itemService.usertype == 'visitor' || this.itemService.usertype =='' ){
      this.showme=false;
    }
    else{
      this.showme=true;
    }
    console.log(this.showme)
  
      }


   deleteItem(){
     this.presentAlertConfirm();
    //  this.itemService.deleteItem(this.item.id);
    //  console.log("item with id: ", this.item.id, "has been deleted");
    //  this.router.navigateByUrl('/tab1/');
   }
  goToEditPage(){
    this.router.navigate(['tabs/edit-product']);
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Warning',
      message: '<strong>Are you sure you want to delete?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');

                this.itemService.deleteItem(this.item.id).then(() => {
                  console.log("successfully deleted")
                  this.router.navigateByUrl('/');
                }, err => {
                });
                
          }
        }
      ]
    });

    await alert.present();
  }

  orderme(){
    if(this.user==null){
      console.log("You must login to create an order")
      this.router.navigate(["/signin"])
      return;
    }
    console.log(this.user.id);
    console.log(this.order.quantity);
   // this.order.uid=this.user.uid;
    this.itemService.createOrder(this.item,this.order.quantity)

  }

  change(){
    console.log(this.order.quantity)
    if(this.order.quantity>50){
      console.log('thats a lot')
    }
  }

}
