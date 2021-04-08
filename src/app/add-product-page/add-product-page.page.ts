import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { File } from "@ionic-native/file/ngx";
import firebase from 'firebase/app';
import 'firebase/storage';  // <----

@Component({
  selector: 'app-add-product-page',
  templateUrl: './add-product-page.page.html',
  styleUrls: ['./add-product-page.page.scss'],
})
export class AddProductPagePage implements OnInit {
  
  add_item_form: FormGroup;

  fromEdit=false;

  result:any;

  imgfile="";
  


  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    public itemService: ItemService,
    private camera: Camera, 
    private file: File
  ) { }

  ngOnInit() {
    this.add_item_form=this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      url: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  
  isFromEdit(fromEdit){
    this.fromEdit=fromEdit;

  }


  createItem(value){
    console.log(value.name)
    console.log(value.description)

    this.itemService.createItem(value.name,value.price,value.url,value.description);
    this.goBack();
  }

  goBack(){
    this.router.navigate(['/tabs/tab1']);
  }

  async pickImage() {

    const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      var page=this;
      this.camera.getPicture(options).then((imageData) => {
        
        let imageid = (Math.floor(Math.random() * 2000)).toString();
        let filename = "menu_"+imageid+'.jpg'
        console.log(filename+" ****** ")
        
  
      var storageRef = firebase.storage().ref();
      var ImageRef = storageRef.child('images/'+filename);
      var data='data:image/jpeg;base64,' + imageData
  
        var uploadTask=ImageRef.putString(data, 'data_url').then(function(snapshot) {
           console.log('Uploaded a base64 string!');
  
             snapshot.ref.getDownloadURL().then(function(downloadURL) {
              console.log('File available at', downloadURL);
              page.imgfile = downloadURL;
              
            });
             
           });
  
  
      }, (err) => {
       // Handle error
       console.log("Camera issue: " + err);
      });
  
  
    }
  

  

}
