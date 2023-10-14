import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/core/models/product.model';
import { ProductsService } from '../../services/products.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { NotificationType } from 'src/app/core/models/notification.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {

  product!: IProduct;

  constructor(
    private routeParam: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private notificationService: NotificationService
  ) {
    this.product = {
      sku: '',
      name: '',
      description: '',
      tags: [],
      price: 0,
      stock: 0,
      image: ''
    };
  }

  ngOnInit(): void {
    let sku: string = this.routeParam.snapshot.params['sku'];

    this.productsService.getProduct$(sku).subscribe({
      next: (response) => {
        this.product = response;
      },
      error: (err) => {
        this.notificationService.notify({
          title: 'Update Product',
          message: err.error.message,
          type: NotificationType.error
        })
      }
    });
  }

  handleSave(product: IProduct): void {
    this.productsService.updateProduct$(product).subscribe({
      next: (response) => {
        this.notificationService.notify({
          title: 'Update Product',
          message: `Product ${response.sku} modify successfully.`,
          type: NotificationType.success
        });
        this.router.navigate(['/products']);
      },
      error: (err) => {
        this.notificationService.notify({
          title: 'Update Product',
          message: err.error.message,
          type: NotificationType.error
        })
      }
    });
  }
}
