import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent {

  @Output() eventConfirm = new EventEmitter<boolean>();
  @Input() nameProduct: string = '';

  confirm() {
    this.eventConfirm.emit(true);
  }
}
