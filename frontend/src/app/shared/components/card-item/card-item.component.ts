import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/core/models/product.model';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent {

  @Input() modelProduct: IProduct = {
    sku: '',
    name: '',
    description: '',
    tags: [],
    price: 0,
    stock: 0,
    image: ''
  };

}
