import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IBreadcrumb } from 'src/app/core/models/breadcrumb.model';
import { BreadcrumbService } from '../../services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

  breadcrumbs$: Observable<IBreadcrumb[]>;

  constructor( private readonly breadcrumbService: BreadcrumbService ) {
    this.breadcrumbs$ = breadcrumbService.breadcrumbs$;
  }
}
