import { switchMap } from 'rxjs/operators';
import { take } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {

  public sum = 0;
  private value;
  order:any=[];
  id;

  constructor(private orderService: OrderService, private router: Router, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('userId');
    if (this.id)
      this.orderService.viewOrder(this.id).pipe(take(1)).subscribe(p => this.order = p);

    this.add(this.order);  

   }

   delete() {
    if (!confirm('Are you sure you want to cancel this order?'))
      return;

    this.orderService.cancelOrder(this.id);
    this.router.navigate(['/orders']);
  }

  add(data){  
    this.value=data  
    for(let j=0;j<data.length;j++){  
         this.sum+= this.value[j].totalPrice  
         }  
  }  

  ngOnInit(): void {
  }


}
