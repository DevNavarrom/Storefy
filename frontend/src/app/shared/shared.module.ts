import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardItemComponent } from './components/card-item/card-item.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { NotificationComponent } from './components/notification/notification.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';



@NgModule({
  declarations: [
    CardItemComponent,
    PaginationComponent,
    NotificationComponent,
    SearchBarComponent,
    ModalConfirmComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [ 
    CardItemComponent, 
    PaginationComponent,
    NotificationComponent,
    SearchBarComponent,
    ModalConfirmComponent
  ]
})
export class SharedModule { }
