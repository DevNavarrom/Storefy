import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, map } from 'rxjs';
import { ResponseProducts } from 'src/app/core/models/response.model';
import { IProduct } from 'src/app/core/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly URL = environment.api;

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });

  constructor( private http: HttpClient ) { }

  getAllProducts$(skip?: number, limit?: number): Observable<ResponseProducts<IProduct>> {

    let _skip = skip ??= 0;

    return this.http.get<ResponseProducts<IProduct>>(`${this.URL}/product?limit=${limit}&skip=${_skip}`, {headers: this.headers}).pipe(
      map((data: ResponseProducts<IProduct>) => data )
    );
  }

  saveProduct$( product: IProduct ): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.URL}/product`, product, {headers: this.headers});
  }

  updateProduct$( product: IProduct ): Observable<IProduct> {
    return this.http.patch<IProduct>(`${this.URL}/product/${product.sku}`, product, { headers: this.headers });
  }

  getProduct$(sku: string): Observable<IProduct> {
    let filter = {
      term: sku
    }

    return this.http.post<IProduct>(`${this.URL}/product/sku`, filter, { headers: this.headers } );
  }

  searchProducts$( term: string ): Observable<ResponseProducts<IProduct>> {
    return this.http.get<ResponseProducts<IProduct>>(`${this.URL}/product/filter?search=${term}`, {headers: this.headers}).pipe(
      map((data) => data)
    );
  }

  deleteProduct$( id: string ): Observable<any> {
    return this.http.delete<any>(`${this.URL}/product?id=${id}`);
  }

}
