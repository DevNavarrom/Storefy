import { Component, OnInit } from '@angular/core';
import { INotification, NotificationType } from 'src/app/core/models/notification.model';
import { NotificationService } from '../../services/notification.service';
import { debounceTime, tap } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  showNotification: boolean = false;

  notification: INotification = {
    title: '',
    message: '',
    type: NotificationType.warning
  }

  constructor(private notificationService: NotificationService ) {}

  ngOnInit(): void {
    this.notificationService.notifyRequest$.pipe(
      tap((notifica: INotification) => {
        this.notification = notifica;
        this.showNotification = true;
      }),
      debounceTime(5000),
      tap(() => {
        this.showNotification = false;
      })
    ).subscribe();
  }

}
