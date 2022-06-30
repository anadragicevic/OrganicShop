import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuardService]},
  { path: 'shopping-cart', component: ShoppingCartComponent, canActivate: [AuthGuardService]},
  { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuardService]},
  { path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuardService]},
   { path: 'login', component: LoginComponent},
  { path: 'my-orders', component: MyOrdersComponent},
  { path: 'admin/orders', component: AdminOrdersComponent},
  { path: 'admin/products/new', component: ProductFormComponent},
  { path: 'admin/products/:id', component: ProductFormComponent},
  { path: 'about-us', component: AboutUsComponent},
  { path: 'admin/products', component: AdminProductsComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
