import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { ColumnConfig, TableModule } from 'src/app/shared/table/table';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-subgroups-list',
  imports: [
    CommonModule, 
    RouterModule,  
    TableModule,
    TranslateModule
  ],
  templateUrl: './subgroups-list.html',
  styleUrl: './subgroups-list.scss'
})
export class SubgroupsList {
  subgroups: any[] = [];
  loading = false;
  error = '';

  columns: ColumnConfig[] = [
    { key: 'groupCode', label: 'subgroups.group_code', type: 'text' },
    { key: 'groupName', label: 'subgroups.group_name', type: 'text' },
    { key: 'code', label: 'subgroups.code', type: 'text' },
    { key: 'name', label: 'subgroups.name', type: 'text' },
    { key: 'code', label: '', type: 'link', path: '/groups' }
  ];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('user');
    const user = stored ? JSON.parse(stored) : null;
    if (user.role === "ADM")
      this.loadSubgroups(null);    
    else if (user.role = 'SUP')
      this.loadSubgroups(user.belongs);
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
}
