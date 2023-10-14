import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { IProduct } from 'src/app/core/models/product.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { NotificationType } from 'src/app/core/models/notification.model';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  submitted: boolean = false;

  private product: IProduct = {
    sku: '',
    name: '',
    description: '',
    tags: [],
    price: 0,
    stock: 0,
    image: ''
  };

  form: FormGroup = new FormGroup({
    sku: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    tags: new FormControl(''),
    price: new FormControl(0),
    stock: new FormControl(0),
    image: new FormControl('')
  });

  constructor( 
    private fb: FormBuilder, 
    private productService: ProductsService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        sku: [ '', Validators.required ],
        name: [ '', Validators.required ],
        description: [ '', Validators.required ],
        tags: [ '', Validators.required ],
        price: [ 0, Validators.required ],
        stock: [ 0, Validators.required ],
        image: [ '', Validators.required ]
      }
    );
  }

  get fc(): {[key: string]: AbstractControl} {
    return this.form.controls;
  }

  onSubmit(): void {

    this.submitted = true;

    if ( this.form.invalid ) return;

    this.product = {
      sku: this.form.get('sku')?.value,
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value,
      tags: String(this.form.get('tags')?.value).split(','),
      price: this.form.get('price')?.value,
      stock: this.form.get('stock')?.value,
      image: this.form.get('image')?.value,
    };

    console.log(this.form.value);
    this.productService.saveProduct$(this.product).subscribe({
      next: (response) => {
        this.notificationService.notify({
          title: 'Save Product',
          message: `Product ${response.name} save successfully.`,
          type: NotificationType.success
        });
        this.onReset();
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

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

}
