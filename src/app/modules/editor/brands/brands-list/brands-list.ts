import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { ColumnConfig, TableModule } from 'src/app/shared/table/table';

@Component({
  selector: 'app-brands-list',
    imports: [
    CommonModule, 
    RouterModule,  
    TableModule
  ],
  templateUrl: './brands-list.html',
  styleUrl: './brands-list.scss'
})
export class BrandsList {
  brands: any[] = [];
  loading = false;
  error = '';

  
  columns: ColumnConfig[] = [
    { key: 'code', label: 'Code', type: 'text' },
    { key: 'brand', label: 'Name', type: 'text' },
    { key: 'code', label: 'Details', type: 'link', path: '/brands' }
  ];
  
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadBrands();    
  }

  loadBrands() {
    this.loading = true;
    this.api.post<any>('/getBrands', null).subscribe({
        next: (res) => {
        this.brands = res.brands || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading brands';
        this.loading = false;
      }
    });
  }

}
