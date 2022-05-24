import { Product } from './../models/product';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart$;
  items$;
  product:Product;

  constructor(private shoppingCartService : ShoppingCartService) { }

  async ngOnInit(){
    this.cart$=await this.shoppingCartService.getCart();
    
  }

}
