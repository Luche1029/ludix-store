import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { FormsModule } from '@angular/forms';
import { ColumnConfig, TableModule } from 'src/app/shared/table/table';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-stores-list',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    FormsModule,
    TableModule,
    TranslateModule
  ],
  templateUrl: './stores-list.html',
  styleUrl: './stores-list.scss',
})
export class StoresList {

  groups: any[] = [];
  subgroups: any[] = [];
  stores: any[] = [];
  user: any;
  loading = false;
  error = '';

  filters = {
    group: '',
    subgroup: ''
  };

  columns: ColumnConfig[] = [
    { key: 'name', label: 'stores.name', type: 'text' },
    { key: 'store_code', label: 'stores.code', type: 'text' },
    { key: 'store_code', label: '', type: 'link', path: '/stores' }
  ];
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('user');
    this.user = stored ? JSON.parse(stored) : null;
    this.loadInitialFilters();
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
    if (this.user.role === 'ADM'){
      this.loadGroups();
    }
    else if (this.user.role === 'SUP') {
      this.loadSubgroups(this.user.belongs);
    }  
    else if (this.user.role === 'CAT') {
      this.loadStores(this.user.belongs);
    }  
  }

  onGroupChange() {
    this.filters.subgroup = '';
    this.subgroups = [];
    this.stores = [];

    if (this.filters.group) {
      this.loadSubgroups(this.filters.group);
    }    
    
  }

  onSubgroupChange() {
    this.stores = [];
  }

  applyFilters() {
    const body = {
      groupCode: this.filters.group,
      subgroupCode: this.filters.subgroup
    };
    this.api.post<any>('/getStores', body).subscribe({
      next: (res) => {
        this.stores = res.stores || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading orders';
        this.loading = false;
      }
    });
  }
}
