import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Order } from 'src/app/interfaces/order.interface';
import { FormsModule } from '@angular/forms';
import { ColumnConfig, TableModule } from 'src/app/shared/table/table';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, 
    CurrencyPipe, 
    DatePipe, 
    FormsModule,
    TableModule,
    TranslateModule
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
  status: any[]= [];
  groups: any[] = [];
  subgroups: any[] = [];
  stores: any[] = [];
  orders: any[]= [];

  columns: ColumnConfig[] = [
    { key: 'date', label: 'orders.date', type: 'date', format: 'yyyy-MM-dd HH:mm' },
    { key: 'orderNumber', label: 'orders.order_number', type: 'text' },
    { key: 'pcPn', label: 'orders.pn', type: 'text' },
    { key: 'pcQty', label: 'orders.qt', type: 'text' },
    { key: 'total', label: 'orders.total', type: 'currency', currency: 'EUR' },
    { key: 'dealer', label: 'orders.dealer', type: 'text' },
    { key: 'status', label: 'orders.status', type: 'text' },
    { key: 'orderNumber', label: '', type: 'link', path: '/orders' }
  ];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('user');
    this.user = stored ? JSON.parse(stored) : null;
    this.loadStatus();
    this.loadInitialFilters();
    this.loadOrders();    
  }

  loadStatus() {
    this.api.post<any>('/getStatus', null).subscribe({
        next: (res) => {
        this.status = res.status || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading status';
        this.loading = false;
      }
    });
  }

  loadGroups() {
    this.api.post<any>('/getGroups', null).subscribe({
        next: (res) => {
        this.groups = res.groups || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading groups';
        this.loading = false;
      }
    });
  }

  loadSubgroups(groupCode: any) {
    this.api.post<any>('/getSubgroups', {groupCode}).subscribe({
        next: (res) => {
        this.subgroups = res.subgroups || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading subgroups';
        this.loading = false;
      }
    });
  }

  loadStores(subgroupCode: any) {
    this.api.post<any>('/getStores', {subgroupCode}).subscribe({
        next: (res) => {
        this.stores = res.stores || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading subgroups';
        this.loading = false;
      }
    });
  }

  loadInitialFilters() {
    if (this.user.role === 'ADM') {
      this.loadGroups();
    } else if (this.user.role === 'SUP') {
      this.loadSubgroups(this.user.belongs);
    } else if (this.user.role === 'CAT') {
      this.loadStores(this.user.belongs);
    }
  }

  loadOrders() {
    let body = null;
    switch (this.user.role) {
      case 'ADM':
        body = {role:this.user.role};
        break;
      case 'SUP':
        body = {role:this.user.role, group: this.user.belongs };
        break;
      case 'CAT':
        body = {role:this.user.role, subgroup: this.user.belongs };
        break;
      case 'STO':
        body = {role:this.user.role, store: this.user.belongs };
        break;
    }
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

  onGroupChange() {
    this.filters.subgroup = '';
    this.filters.store = '';
    this.subgroups = [];
    this.stores = [];

    if (this.filters.group) {
      this.loadSubgroups(this.filters.group);
    }
  }

  onSubgroupChange() {
    this.filters.store = '';
    this.stores = [];

    if (this.filters.subgroup) {
      this.loadStores( this.filters.subgroup);     
    }
  }

  applyFilters() {
    const body = {
      ...this.filters,
      role: this.user.role,
      belongs: this.user.belongs
    };
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

}
