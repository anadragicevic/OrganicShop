import { ShoppingCart } from './../models/shopping-cart';
import { take, Subscription, map, Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartItem } from '../models/shopping-cart-item';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  

  constructor(private db:AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();

    return this.db.object('/shopping-carts/' + cartId).snapshotChanges()
      .pipe(map(x => new ShoppingCart(x.payload.exportVal().items)));
  }

  addToCart(product: Product) {
    this.updateItem(product, 1);
  
  }

  removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }


  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private async getOrCreateCartId() {
    const cartId = localStorage.getItem('cartId');

    if (cartId)
      return cartId;

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;


  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async updateItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item = this.getItem(cartId, product.key);

    item
      .valueChanges()
      .pipe(take(1))
      .subscribe((data: ShoppingCartItem) => {
        const quantity = (data ? (data.quantity || 0) : 0) + change; // Used || to avoid null reference error

        if (!quantity)
          item.remove();

        else
          
          item.update({
            
            title: product.title =null,
            imageUrl: product.imageUrl =null,
            price: product.price =null,
            quantity
          },
          
          );
          
      });
  }
}
