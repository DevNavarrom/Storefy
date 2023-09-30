import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { DetailProductComponent } from './pages/detail-product/detail-product.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ListProductsComponent,
    CreateProductComponent,
    DetailProductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    HttpClientModule
  ]
})
export class ProductsModule { }
