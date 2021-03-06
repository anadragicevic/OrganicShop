import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';





@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product = { title: '', price: '', category: '', imageUrl: '' };
  id;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {

    this.categoryService.getCategories().subscribe(categories => this.categories$ = categories);

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) this.productService.get(this.id).pipe(take(1)).subscribe(p => {
      this.product = p;
      console.log(this.product)
    });
  }


  save(product) {
    console.log(product);
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  }



  ngOnInit(): void {
  }

}
