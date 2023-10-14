import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { IProduct } from 'src/app/core/models/product.model';

@Component({
  selector: 'app-form-products',
  templateUrl: './form-products.component.html',
  styleUrls: ['./form-products.component.scss']
})
export class FormProductsComponent implements OnInit {

  @Output() eventSave = new EventEmitter<IProduct>();
  @Input() product!: IProduct;

  submitted: boolean = false;

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
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    
    this.form = this.fb.group(
      {
        sku: [ this.product?.sku || '', [Validators.required, ] ],
        name: [ this.product?.name || '', Validators.required ],
        description: [ this.product?.description || '', Validators.required ],
        tags: [ this.product?.tags || '', Validators.required ],
        price: [ this.product?.price || 0, Validators.required ],
        stock: [ this.product?.stock || 0, Validators.required ],
        image: [ this.product?.image || '', Validators.required ]
      }
    );

    if (this.product?.sku) {
      this.form.get('sku')?.disable();
    }
    
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

    this.eventSave.emit(this.product);
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

}
