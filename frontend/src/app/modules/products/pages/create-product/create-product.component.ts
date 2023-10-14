import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProduct } from 'src/app/core/models/product.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { NotificationType } from 'src/app/core/models/notification.model';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {

  constructor( 
    private productService: ProductsService,
    private notificationService: NotificationService
  ) {}

  handleSave(product: IProduct): void {

    this.productService.saveProduct$(product).subscribe({
      next: (response) => {
        this.notificationService.notify({
          title: 'Save Product',
          message: `Product ${response.name} save successfully.`,
          type: NotificationType.success
        });
      },
      error: (err) => {
        this.notificationService.notify({
          title: 'Save Product',
          message: err.error.message,
          type: NotificationType.error
        });
      }
    });
  }

}
