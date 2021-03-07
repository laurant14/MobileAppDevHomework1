import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-add-product-page',
  templateUrl: './add-product-page.page.html',
  styleUrls: ['./add-product-page.page.scss'],
})
export class AddProductPagePage implements OnInit {
  
  add_item_form: FormGroup;
  


  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    public itemService: ItemService
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

  createItem(value){
    console.log(value.name)
    console.log(value.description)

    this.itemService.createItem(value.name,value.price,value.url,value.description);
    this.goBack();
  }

  goBack(){
    this.router.navigate(['/tabs/tab1']);
  }

}
