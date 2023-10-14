import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { INotification } from 'src/app/core/models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notifyRequest = new ReplaySubject<INotification>();

  notifyRequest$ = this.notifyRequest.asObservable();

  constructor() { }

  notify(notification: INotification) {
    this.notifyRequest.next(notification);
  }
}
