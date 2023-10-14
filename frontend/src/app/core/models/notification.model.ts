export enum NotificationType {
  success = 'is-success',
  error = 'is-error',
  warning = 'is-warning'
}

export interface INotification {
  title: string;
  message: string;
  type: NotificationType;
}