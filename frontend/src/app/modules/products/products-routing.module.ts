import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './list-products/list-products.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { DetailProductComponent } from './detail-product/detail-product.component';

const routes: Routes = [
  {
    path: '',
    component: ListProductsComponent
  },
  {
    path: 'create',
    component: CreateProductComponent
  },
  {
    path: 'detail',
    component: DetailProductComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
