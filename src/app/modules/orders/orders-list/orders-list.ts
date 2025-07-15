import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Order } from 'src/app/interfaces/order.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, 
    CurrencyPipe, 
    DatePipe, 
    FormsModule
  ],
  templateUrl: './orders-list.html',
  styleUrls: ['./orders-list.scss']
})

export class OrdersList {
 
  loading = true;
  error = '';
  user: any;
  filters = {
    group: '',
    subgroup: '',
    store: '',
    startDate: '',
    endDate: '',
    status: ''
  };
  groups: any[] = [];
  subgroups: any[] = [];
  stores: any[] = [];
  orders: any[]= [];

  constructor(private api: ApiService) {}


  ngOnInit(): void {
    const stored = localStorage.getItem('user');
    this.user = stored ? JSON.parse(stored) : null;
    
    const body = {
      role: this.user.role,
      belongs: this.user.belongs
    }
    this.loadInitialFilters();
    this.loadOrders(body); 
   
  }

  loadInitialFilters() {
    if (this.user.role === 'ADM') {
      this.api.post<any>('/getGroups', null).subscribe({
         next: (res) => {
          console.log("res", JSON.stringify(res));
          this.groups = res.groups || [];
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error loading orders';
          this.loading = false;
        }
    });
      console.log("groups", this.groups);
    }
    if (['ADM', 'SUP'].includes(this.user.role)) {
      this.api.get<any[]>('/getSubgroups').subscribe(res => this.subgroups = res);
    }
    if (['ADM', 'SUP', 'CAT'].includes(this.user.role)) {
      this.api.get<any[]>('/getStores').subscribe(res => this.stores = res);
    }
  }

  loadOrders(body: any) {
     this.api.post<{ orders: Order[] }>('/getOrdersList', body).subscribe({
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

  applyFilters() {
    const body = {
      ...this.filters,
      role: this.user.role,
      belongs: this.user.belongs
    };
    this.api.post<any[]>('orders/filter', body).subscribe(res => this.orders = res);
  }

}
