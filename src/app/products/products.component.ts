import { CategoryService } from './../services/category.service';
import { Product } from 'src/app/models/product';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$;
  categories$;
  category: string;
  filteredProducts$=[];

  constructor(private route:ActivatedRoute, 
              private productService: ProductService, 
              private categoryService: CategoryService) {

    this.productService.getAll().pipe(switchMap(products=>{this.products$=products;
      return route.queryParamMap})).subscribe(params=>{
      this.category=params.get('category');
      this.filteredProducts$=(this.category)? this.products$.filter(p=>p.payload.val().category===this.category)
      : this.products$;
    });
    this.categoryService.getCategories().subscribe(categories=>this.categories$=categories);

   

   }

  ngOnInit(): void {
  }

}
