import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardItemComponent } from './components/card-item/card-item.component';
import { PaginationComponent } from './components/pagination/pagination.component';



@NgModule({
  declarations: [
    CardItemComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ 
    CardItemComponent, 
    PaginationComponent 
  ]
})
export class SharedModule { }
