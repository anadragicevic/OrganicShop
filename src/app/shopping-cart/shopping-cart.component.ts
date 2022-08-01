import { AngularFireObject } from '@angular/fire/compat/database';
import { ShoppingCartItem } from './../models/shopping-cart-item';
import { Product } from './../models/product';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  @Input('product') product: Product;
  cart$: any;


  constructor(private shoppingCartService: ShoppingCartService, private router: Router) {
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }

  clearCart() {

    Swal.fire({
      title: 'Are you sure you want to clear your shopping cart?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `Cancel`,
      confirmButtonColor: '#3085d6',
      denyButtonColor: '#FFA500',
      width: '30%'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Items deleted!',
          icon: 'success', showConfirmButton: false, width: '25%', timer: 2000
        })
        this.shoppingCartService.clearCart();
      } else if (result.isDenied) {
      }
    })

  }

  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.product);
  }

}
