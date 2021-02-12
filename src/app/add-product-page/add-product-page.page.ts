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
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  createItem(value){
    console.log(value.name)
    console.log(value.description)

    this.itemService.createItem(value.name,value.price,value.quantity,value.src);
    this.goBack();
  }

  goBack(){
    this.router.navigate(['/tabs/tab1']);
  }

}
