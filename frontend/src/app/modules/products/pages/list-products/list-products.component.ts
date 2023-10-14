import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/core/models/product.model';
import { ResponseProducts } from 'src/app/core/models/response.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  dataProducts: ResponseProducts<IProduct> = new ResponseProducts<IProduct>();

  constructor( private productsService: ProductsService ) {}

  ngOnInit() {

    this.productsService.getAllProducts$(0, 6).subscribe((result) => this.dataProducts = result);

  }

  getProducts(value: number) {
    let skip: number = value * 6;
    this.productsService.getAllProducts$(skip, 6).subscribe((result) => this.dataProducts = result);
  }

}
