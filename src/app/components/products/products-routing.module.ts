import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './physical/product-list/product-list.component';
import { AddProductComponent } from './physical/add-product/add-product.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'physical/product-list',
        component: ProductListComponent
      },
      {
        path: 'physical/add-product',
        component: AddProductComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
