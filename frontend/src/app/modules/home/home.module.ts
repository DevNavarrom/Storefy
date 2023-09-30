import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeRoutingModule } from './home-routing.module';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';



@NgModule({
  declarations: [
    DashboardComponent,
    BreadcrumbsComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
