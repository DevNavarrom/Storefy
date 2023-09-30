import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, map } from 'rxjs';
import { ResponseProducts } from 'src/app/core/models/response.model';
import { Product } from 'src/app/core/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly URL = environment.api;

  constructor( private http: HttpClient ) { }

  getAllProducts$(skip?: number, limit?: number): Observable<ResponseProducts<Product>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    let _skip = skip ??= 0;
    return this.http.get<ResponseProducts<Product>>(`${this.URL}/product?limit=${limit}&skip=${_skip}`, {headers}).pipe(
      map((data: ResponseProducts<Product>) => data )
    );
  }

}
