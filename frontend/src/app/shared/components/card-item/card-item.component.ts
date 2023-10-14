import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/core/models/product.model';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent {

  constructor( private router: Router ) {}

  @Input() modelProduct: IProduct = {
    sku: '',
    name: '',
    description: '',
    tags: [],
    price: 0,
    stock: 0,
    image: ''
  };

  navigate(): void {
    this.router.navigate(['/products/detail', this.modelProduct.sku]);
  }

}
