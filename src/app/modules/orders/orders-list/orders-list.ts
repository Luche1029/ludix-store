import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Order } from 'src/app/interfaces/order.interface';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, 
    CurrencyPipe, 
    DatePipe
  ],
  templateUrl: './orders-list.html',
  styleUrls: ['./orders-list.scss']
})
export class OrdersList {
 
  orders: any[] = [];
  loading = true;
  error = '';
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.post<{ orders: Order[] }>('/getOrdersList', { subgroupCode: 'SPR-WEB' }).subscribe({
      next: (res) => {
        this.orders = res.orders || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading orders';
        this.loading = false;
      }
    });
}


}
