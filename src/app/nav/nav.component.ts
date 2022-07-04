import { ShoppingCartService } from './../services/shopping-cart.service';
import { AuthService } from './../services/auth.service';
import { User } from 'firebase/auth';
import { AngularFireAuth,  } from '@angular/fire/compat/auth'
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/compat/app'
import { ShoppingCart } from '../models/shopping-cart';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit  {
  

  cart$: Observable<ShoppingCart>;
 
  constructor(public auth:AuthService, private shoppingCartService: ShoppingCartService, private route: Router) {
      
   }
  async ngOnInit() {
    this.cart$= await this.shoppingCartService.getCart();
    
  }

  logout(){ 
    
    this.auth.logout();
    
  }
}
