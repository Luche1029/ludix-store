import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'src/app/shared/table/table';
import { FormsModule } from '@angular/forms';
import { AccessoryService } from '../../../core/accessory.service';
import { AccessoryCategory, AccessoryProduct, AccessorySubcategory } from 'src/app/interfaces/accessory.interface';
import { Switch } from "src/app/shared/switch/switch";

@Component({
  selector: 'app-accessories-list',
  standalone: true,
  templateUrl: './accessories-list.html',
  styleUrl: './accessories-list.scss',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TableModule,
    TranslateModule,
    Switch
  ],
})
export class AccessoriesList {
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
  
  categories: AccessoryCategory[] = [];

  constructor(
    private api: ApiService,
    private accessoryService: AccessoryService
  ) {}

  ngOnInit(): void {
    const subgroupCode = 'MIC-GR1';
    this.accessoryService.getAccessories(subgroupCode).subscribe(res => {
      if (res.success) this.categories = res.related;
      this.updateSubcategoryVisibility();
    });
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

  }

  toggleVisibility(product: AccessoryProduct) {
    const subgroupCode = 'MIC-GR1';
    product.isVisible = !product.isVisible;
    this.accessoryService.setAccessoryVisibility(subgroupCode, product.pn, product.isVisible).subscribe(res => { 
       this.updateSubcategoryVisibility();
    });
  }

  updateSubcategoryVisibility(): void {
    this.categories.forEach(category => {
      category.subcategories.forEach(sub => {
        const allProducts = sub.brands.flatMap(b => b.products);
        sub.isVisible = allProducts.every(p => p.isVisible);
      });
    });
  }

  toggleCatVisibility(sub: AccessorySubcategory) {
    const subgroupCode = 'MIC-GR1';
    sub.isVisible = !sub.isVisible;

    const payload = {
      subgroup: subgroupCode,
      products: sub.brands.flatMap(b => b.products).map(p => ({
        pn: p.pn,
      })),
      visible: sub.isVisible
    };

    this.accessoryService.setMultipleAccessoryVisibility(payload).subscribe(() => {
      this.updateSubcategoryVisibility();
    });
  }

}
