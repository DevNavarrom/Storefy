import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListCategoriesComponent } from '../categories/list-categories/list-categories.component';
import { CartComponent } from '../cart/cart.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'products',
        loadChildren: () => import('../products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('../categories/categories.module').then(m => m.CategoriesModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('../cart/cart.module').then(m => m.CartModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
