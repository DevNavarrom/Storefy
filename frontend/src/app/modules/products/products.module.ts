import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { DetailProductComponent } from './pages/detail-product/detail-product.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormProductsComponent } from './components/form-products/form-products.component';


@NgModule({
  declarations: [
    ListProductsComponent,
    CreateProductComponent,
    DetailProductComponent,
    FormProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
