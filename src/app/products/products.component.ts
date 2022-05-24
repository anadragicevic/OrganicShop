import { Product } from './../models/product';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { CategoryService } from './../services/category.service';
import { ProductService } from './../services/product.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { take, Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products$;
  categories$;
  category: string;
  filteredProducts$=[];
  product :Product;
  shoppingCart:any;
  subscription:Subscription;


  constructor(private route:ActivatedRoute, 
              private productService: ProductService, 
              private categoryService: CategoryService,
              private shoppingCartService:ShoppingCartService) {

    this.productService.getAll().pipe(switchMap(products=>{this.products$=products;
      return route.queryParamMap})).subscribe(params=>{
      this.category=params.get('category');
      this.filteredProducts$=(this.category)? this.products$.filter(p=>p.payload.val().category===this.category)
      : this.products$;
    });
    this.categoryService.getCategories().subscribe(categories=>this.categories$=categories);

    
   }
  

  async ngOnInit(){
   this.subscription=(await this.shoppingCartService.getCart()).subscribe(cart=>this.shoppingCart=cart);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe;
  }
  addToChart(product:Product){
         this.shoppingCartService.addToCart(product);
  }

  getQuantity(){
     
     let item=this.shoppingCart?.items[this.product?.key];
     return item? item.quantity : 0;
  }
}
