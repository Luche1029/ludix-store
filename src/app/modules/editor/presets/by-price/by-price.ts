import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { ColumnConfig, TableModule } from 'src/app/shared/table/table';

@Component({
  selector: 'app-by-price',
  imports: [  
    CommonModule, 
    RouterModule,  
    TableModule
  ],
  templateUrl: './by-price.html',
  styleUrl: './by-price.scss'
})
export class ByPrice {
  suppliers: any[] = [];
  presets: any[] = [];
  loading = false;
  error = '';

  columns: ColumnConfig[] = [
    { key: 'supplierName', label: 'Supplier', type: 'text' },
    { key: 'subgroupName', label: 'Subgroup', type: 'text' },
    { key: 'arc', label: 'Arc', type: 'text' },
    { key: 'min', label: 'Min', type: 'text' },
    { key: 'max', label: 'Max', type: 'text' },
    { key: 'pn', label: 'PN', type: 'text' },    
    { key: '', 
      label: 'Re-build', 
      type: 'button', 
      action: 'rebuild', 
      params: ['arc', 'min', 'max', 'supplierCode', 'subgroupCode'] }
  ];

  constructor(private api: ApiService) {}

  ngOnInit(): void {    
      this.loadSuppliers();
      this.loadPresets();
  }
  
  loadSuppliers() {
    this.api.post<any>('/getSuppliers', null).subscribe({
      next: (res) => {
        this.suppliers = res.suppliers || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading subgroups';
        this.loading = false;
      }
    });
  }

  loadPresets() {
    this.api.post<any>('/getPresetsByPrice', null).subscribe({
      next: (res) => {
        console.log(JSON.stringify(res));
        this.presets = res.presets || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading subgroups';
        this.loading = false;
      }
    });
  }

    handleTableButtonClick(event: { action: string, params: any }) {
    switch (event.action) {
      case 'rebuild':
        this.rebuild(event.params.arc, event.params.min, event.params.max, 
          event.params.supplierCode, event.params.subgroupCode);        
        break;
      default:
        console.warn('Unknown action:', event.action);
    }
  }

  rebuild( arc: string, min: number, max: number,supplierCode: string, subgroupCode: string) {
    const body = {
      supplier: supplierCode,
      subgroupCode: subgroupCode,
      arc: arc,
      min: min,
      max: max
    };
    this.api.post<any>('/createPresetByPrice', body).subscribe({
      next: (res) => {
        console.log(JSON.stringify(res));
      },
      error: (err) => {
        this.error = 'Error rebuilding preset';
        this.loading = false;
      }
    });
  }
}
