import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardItemComponent } from './components/card-item/card-item.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { NotificationComponent } from './components/notification/notification.component';



@NgModule({
  declarations: [
    CardItemComponent,
    PaginationComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ 
    CardItemComponent, 
    PaginationComponent,
    NotificationComponent
  ]
})
export class SharedModule { }
