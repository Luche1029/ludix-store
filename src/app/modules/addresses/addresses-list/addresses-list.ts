import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from 'src/app/core/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addresses-list',
  standalone: true,
  imports: [
    NgIf, 
    NgFor, 
    TranslateModule,
    FormsModule
  ],
  templateUrl: './addresses-list.html',
  styleUrl: './addresses-list.scss',
})
export class AddressesList {
  loading = true;
  error = '';
  user: any;
  filters = {
    group: '',
    subgroup: '',
    store: ''
  };
  groups: any[] = [];
  subgroups: any[] = [];
  stores: any[] = [];
  addresses: any[] = [ ];

  constructor(
    private router: Router,
    private api: ApiService
  ) {

  }

  
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
    if (this.user.role === 'ADM') {
      this.loadGroups();
    } else if (this.user.role === 'SUP') {
      this.loadSubgroups(this.user.belongs);
    } else if (this.user.role === 'CAT') {
      this.loadStores(this.user.belongs);
    }
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
    this.api.post<any>('/getAddresses', {storeCode: this.filters.store}).subscribe({
      next: (res) => {
        this.addresses = res.addresses || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading addresses';
        this.loading = false;
      }
    });
  }

  editAddress(address: any): void {
    this.router.navigate(['/addresses/new'], { state: { address } });
  }


  deleteAddress(addressId: number): any {
    console.log("addressId", addressId);
    this.api.post<any>('/deleteAddress', {addressId}).subscribe({
      next: (res) => {
        console.log(JSON.stringify(res));
        this.loading = false;
        this.applyFilters(); 
      },
      error: (err) => {
        this.error = 'Error loading addresses';
        this.loading = false;
      }
    });
  }

}
