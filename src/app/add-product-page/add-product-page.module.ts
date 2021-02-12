import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { Routes, RouterModule} from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { AddProductPagePageRoutingModule } from './add-product-page-routing.module';

import { AddProductPagePage } from './add-product-page.page';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';

/*const routes: Routes=[
  {
  path:'',
  component: AddProductPagePage
  }
];*/
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddProductPagePageRoutingModule
  ],
  declarations: [AddProductPagePage]
})
export class AddProductPagePageModule {}
