import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/core/models/product.model';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent {

  @Output() eventDelete = new EventEmitter<IProduct>();
  @Input() modelProduct: IProduct = {
    sku: '',
    name: '',
    description: '',
    tags: [],
    price: 0,
    stock: 0,
    image: ''
  };

  constructor( private router: Router ) {}

  navigate(): void {
    this.router.navigate(['/products/detail', this.modelProduct.sku]);
  }

  delete() {
    this.eventDelete.emit(this.modelProduct);
  }

}
