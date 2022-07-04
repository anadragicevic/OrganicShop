
import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from './../environments/environment.prod';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule} from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { LoginComponent } from './login/login.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AboutUsComponent } from './about-us/about-us.component';
import { ViewOrderComponent } from './view-order/view-order.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ShoppingCartComponent,
    HomeComponent,
    ProductsComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    CheckOutComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    LoginComponent,
    ProductFormComponent,
    AboutUsComponent,
    ViewOrderComponent,
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    FormsModule,
    BsDropdownModule,
    ReactiveFormsModule,
    MatPaginatorModule
    
 
  ],
  providers: [
    
    AuthService,
    UserService,
    CategoryService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
