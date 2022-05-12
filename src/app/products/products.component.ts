import { CategoryService } from './../services/category.service';
import { Product } from 'src/app/models/product';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$;
  categories$;

  constructor(private productService: ProductService, private categoryService: CategoryService) {
    this.productService.getAll().subscribe(products=>this.products$=products);
    this.categoryService.getCategories().subscribe(categories=>this.categories$=categories)
   }

  ngOnInit(): void {
  }

}
