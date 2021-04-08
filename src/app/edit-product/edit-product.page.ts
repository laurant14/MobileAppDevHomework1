import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Menu} from 'Menu';
import {ItemService} from '../item.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})
export class EditProductPage implements OnInit, AfterViewInit {
  //private menu: Observable<Menu[]>;
  menu: Menu={
    name: '',
    price: 0,//this aint right
    category: '',
    url: '',
    description: '',
    id: '',
  }

  constructor(private activatedRoute:ActivatedRoute, private itemService: ItemService, private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void{
    const id=this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      this.itemService.getSingleMenu(id).subscribe(menuData=>{
        this.menu=menuData;
      });
    }
  }

  updateProduct(value){
    this.itemService.updateProductInfo(this.menu).then(()=>{
      this.router.navigateByUrl('/');
    },err=>{

    });
  }

}
