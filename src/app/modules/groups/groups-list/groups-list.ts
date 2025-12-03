import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { ColumnConfig, TableModule } from 'src/app/shared/table/table';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-groups-list',
  imports: [
    CommonModule, 
    RouterModule,  
    TableModule,
    TranslateModule
  ],
  templateUrl: './groups-list.html',
  styleUrl: './groups-list.scss'
})
export class GroupsList {
  groups: any[] = [];
  loading = false;
  error = '';

  columns: ColumnConfig[] = [
    { key: 'code', label: 'groups.code', type: 'text' },
    { key: 'name', label: 'groups.name', type: 'text' },
    { key: 'code', label: '', type: 'link', path: '/groups' }
  ];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadGroups();    
  }

  loadGroups() {
    this.loading = true;
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

}
