import { onAuthStateChanged } from 'firebase/auth';
import { AngularFireObject } from '@angular/fire/compat/database';
import { Product } from './../models/product';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { CategoryService } from './../services/category.service';
import { ProductService } from './../services/product.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { take, Subscription, Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { isNgTemplate } from '@angular/compiler';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @Input('shopping-cart') shoppingCart: ShoppingCart; 

  products$;
  categories$;
  category: string;
  filteredProducts$=[];
  product :Product;
  quantity;
  cart$;

  constructor(private route:ActivatedRoute, 
              private productService: ProductService, 
              private categoryService: CategoryService,
              private shoppingCartService:ShoppingCartService,
   ) {

    this.productService.getAll().pipe(switchMap(products=>{this.products$=products;
      return route.queryParamMap})).subscribe(params=>{
      this.category=params.get('category');
      this.filteredProducts$=(this.category)? this.products$.filter(p=>p.payload.val().category===this.category)
      : this.products$;
    });
    this.categoryService.getCategories().subscribe(categories=>this.categories$=categories)
    
   }

  async ngOnInit(){
    this.cart$ =await this.shoppingCartService.getCart();
   
     }
  
  addToChart(product:Product){
         this.shoppingCartService.addToCart(product);
         window.alert('Your product has been added to the cart.');

  }

  // getQuantity(){
     
  //    let item=this.shoppingCart?.items[this.product?.key];
  //    return item? item.quantity : 0;
  // }
}
