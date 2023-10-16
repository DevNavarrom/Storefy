import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { DetailProductComponent } from './pages/detail-product/detail-product.component';

const routes: Routes = [
  {
    path: '',
    component: ListProductsComponent,
    data: { breadcrumb : 'List'},
  },
  {
    path: 'create',
    component: CreateProductComponent,
    data: { breadcrumb : 'Create'},
  },
  {
    path: 'detail/:sku',
    component: DetailProductComponent,
    data: { breadcrumb : 'Edit'},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
