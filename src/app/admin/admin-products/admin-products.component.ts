import { OrderSuccessComponent } from './../../order-success/order-success.component';

import { ProductService } from './../../services/product.service';
import { Component, OnInit, OnDestroy,ViewChild, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
 
  products$;
  filterProducts: any[];
  subscription: Subscription;
  searchText: string='';

  onSearchTextEntered(searchValue: string){
      this.searchText=searchValue;
      console.log(this.searchText);
  }


  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
      .subscribe(products => this.products$ = products);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }

  OnPageChange(event:PageEvent){
    console.log(event);
    const startIndex=event.pageIndex * event.pageSize;
    let endIndex=startIndex + event.pageSize;
    if(endIndex>this.products$?.length){
      endIndex=this.products$?.length;
    }
    this.products$.scope(event.pageSize);
  }


}
