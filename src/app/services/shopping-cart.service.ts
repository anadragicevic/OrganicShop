import { take, Subscription, map } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }

  create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }
 async getCart(){
   let cartId=await this.getOrCreateCartId();
   return this.db.object('/shopping-carts/'+cartId).snapshotChanges().pipe(
    map(object => {
      console.log(object);
      return object;
    })
  );;;
 }

 getItem(cartId:string, productId:string){
   return this.db.object('/shopping-carts/'+cartId +'/items/'+ productId);
 }

  async getOrCreateCartId(){
    let cartId=localStorage.getItem('cartId');
         if(!cartId){
            let result=await this.create(); 
              localStorage.setItem('cartId', result.key);
              return result.key;
            }
                return cartId;     
  }

  async getCartItems(product:Product){
    let cartId = await this.getOrCreateCartId();
     return this.db.object('/shopping-carts/'+cartId +'/items/'+ product.key);
  }

  async addToCart(product:Product){

      let cartId = await this.getOrCreateCartId();
      let items$=this.getItem(cartId, product.key);
      items$.valueChanges().pipe(take(1)).subscribe(item=>{
        if(item!=null) items$.update({quantity: item['quantity'] +1});
        else items$.set({product:{
          title:product.title=null,
          category:product.category=null,
          imageUrl:product.imageUrl=null,
          price:product.price=null
        }, quantity:1});
      })

  }
}
