import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import {ActivatedRoute, Router} from '@angular/router';

import {AngularFirestore } from '@angular/fire/firestore';
import {ItemService} from '../item.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  user= {email:"laurantrombetta@gmail.com", password:"mypassword"}

  constructor(public afAuth: AngularFireAuth, 
  	private itemService: ItemService,
  	private router:Router,
  	public firebase:AngularFirestore) { }

  ngOnInit() {
  }

signInWithEmail(email: string, password: string) {
	// Promise<firebase.auth.UserCredential>
  console.log("signin ...");
  this.afAuth.signInWithEmailAndPassword(email, password).then(user => {
		// navigate to user profile
		console.log(user.user.email, user.user.uid);
		this.itemService.load_my_orders();

		var user1 = firebase.auth().currentUser;
		console.log(user1.uid)
		this.itemService.setUID(user.user.uid);
		// fbService
		var db = firebase.firestore();
		var self=this;
		db.collection("usertype").where("uid", "==", user1.uid)
          .get()
          .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.id, " => ", doc.data());
                  var type = doc.data().usertype;
                  console.log("usertype:"+type);
                  self.itemService.setUsertype(type);
                  
              });
          })
          .catch(function(error) {
              console.log("Error getting documents: ", error);
          });
        this.router.navigate(['tabs/tab1']);


	})
	.catch(error => {
		console.log(error)
	});
  
}

 signup(){
  	this.router.navigate(["/signup"])

  }

  loginFacebook(){
var provider = new firebase.auth.FacebookAuthProvider();
firebase.auth().signInWithRedirect(provider);
var self=this;
firebase.auth()
  .getRedirectResult()
  .then((result) => {
    if (result.credential) {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      // var token = credential.accessToken;
      // ...
    }
    // The signed-in user info.
    var user = result.user;
    console.log(user)
    self.itemService.setUID(user.uid);
    this.itemService.load_my_orders();
    this.router.navigate(['tabs/tab1']);

  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });


  }

  loginGoogle(){
  	var provider = new firebase.auth.GoogleAuthProvider();
  	var self=this;
  	firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    // var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user)
        self.itemService.setUID(user.uid);
        self.itemService.load_my_orders();
        self.itemService.setUsertype("visitor");
      this.router.navigate(['tabs/tab1']);


    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  }

}
