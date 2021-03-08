import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'add-product-page',
        loadChildren: () => import('../add-product-page/add-product-page.module').then(m => m.AddProductPagePageModule)
      },
      {
        path: 'order-detail-page',
        loadChildren: () => import('../order-detail-page/order-detail-page.module').then(m => m.OrderDetailPagePageModule)
      },
      {
        path: 'product-detail-page',
        loadChildren: () => import('../product-detail-page/product-detail-page.module').then(m => m.ProductDetailPagePageModule)
      },
      {
        path: 'edit-product',
        loadChildren: () => import('../edit-product/edit-product.module').then(m => m.EditProductPageModule)
      },
      
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
