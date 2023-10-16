import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/core/models/product.model';
import { ResponseProducts } from 'src/app/core/models/response.model';
import { ProductsService } from '../../services/products.service';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  dataProducts: ResponseProducts<IProduct> = new ResponseProducts<IProduct>();

  private searchTerms = new Subject<string>();
  observableProducts$: Observable<ResponseProducts<IProduct>> = of(new ResponseProducts<{}>);

  constructor( private productsService: ProductsService ) {}

  ngOnInit() {

    this.productsService.getAllProducts$(0, 6).subscribe((result) => this.dataProducts = result);

    this.observableProducts$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(
        (term: string) => this.productsService.searchProducts$(term).pipe(
          map((data: ResponseProducts<IProduct>) => data)
        )
      )
    );

    this.observableProducts$.subscribe((data) => {
      this.dataProducts = data;
      console.log(data);
    });

  }

  getProducts(value: number) {
    let skip: number = value * 6;
    this.productsService.getAllProducts$(skip, 6).subscribe((result) => this.dataProducts = result);
  }

  handleSearch(term: string) {
    this.searchTerms.next(term);
  }

}
