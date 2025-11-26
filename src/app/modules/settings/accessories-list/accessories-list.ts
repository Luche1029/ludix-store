import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AccessoryService } from '../../../core/accessory.service';
import { AccessoryCategory, AccessoryProduct, AccessorySubcategory } from 'src/app/interfaces/accessory.interface';

@Component({
  selector: 'app-accessories-list',
  standalone: true,
  templateUrl: './accessories-list.html',
  styleUrl: './accessories-list.scss',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TranslateModule
  ],
})
export class AccessoriesList {
  loading = true;
  error = '';
  user: any;
  filters = {
    group: '',
    subgroup: ''
  };
  status: any[]= [];
  groups: any[] = [];
  subgroups: any[] = [];
  
  categories: AccessoryCategory[] = [];

  constructor(
    private api: ApiService,
    private accessoryService: AccessoryService
  ) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('user');
    this.user = stored ? JSON.parse(stored) : null;
    this.loadInitialFilters();
  }

  loadAccessories(subgroupCode: string) {
    this.accessoryService.getAccessories(subgroupCode).subscribe(res => {
      if (res.success) this.categories = res.related;
      this.updateSubcategoryVisibility();
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


  loadInitialFilters() {
    if (this.user.role === 'ADM') 
      this.loadGroups();
    else if (this.user.role === 'SUP') 
      this.loadSubgroups(this.user.belongs);
    else if (this.user.role === 'CAT') 
      this.loadAccessories(this.user.belongs);    
  }

  onGroupChange() {
    this.filters.subgroup = '';
    this.subgroups = [];

    if (this.filters.group) {
      this.loadSubgroups(this.filters.group);
    }
  }
  
  
  applyFilters() {
    this.loadAccessories(this.filters.subgroup);  
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
      isVisible: sub.isVisible
    };

    this.accessoryService.setMultipleAccessoryVisibility(payload).subscribe(res => {
      console.log(res);
      if (res.success) {
        sub.brands.flatMap(b => b.products).forEach(p =>{
          p.isVisible = sub.isVisible;
        });
      }
    });
  }

}
