import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { ColumnConfig, TableModule } from 'src/app/shared/table/table';

@Component({
  selector: 'app-by-app',
  standalone:true,
  imports: [
    CommonModule, 
    RouterModule,  
    TableModule
  ],
  templateUrl: './by-app.html',
  styleUrl: './by-app.scss'
})
export class ByApp {
  suppliers: any[] = [];
  presets: any[] = [];
  loading = false;
  error = '';

  columns: ColumnConfig[] = [
    { key: 'supplierName', label: 'Supplier', type: 'text' },
    { key: 'appName', label: 'App / Games', type: 'text' },
    { key: 'req', label: 'Req', type: 'text' },
    { key: 'pn', label: 'PN', type: 'text' },
    { key: '', 
      label: 'Re-build', 
      type: 'button', 
      action: 'rebuild', 
      params: ['appId', 'req', 'supplierCode'] }
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
    this.api.post<any>('/getPresetsByApp', null).subscribe({
      next: (res) => {
        //console.log(JSON.stringify(res));
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
        this.rebuild(event.params.appId, event.params.req, event.params.supplierCode);        
        break;
      default:
        console.warn('Unknown action:', event.action);
    }
  }

  rebuild(appId: number, req: string, supplierCode: string) {
    //alert(JSON.stringify({appId, req, supplierCode}));
    const body = {
      supplier: supplierCode,
      id_app: appId,
      col: req
    };
    this.api.post<any>('/createPresetByApp', body).subscribe({
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
