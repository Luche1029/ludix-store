import { Component } from '@angular/core';
import { _, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/core/api.service';
import { SettingsService } from 'src/app/core/settings.service';
import { SettingsCategory, SettingsResponse } from 'src/app/interfaces/settings.interface';

@Component({
  selector: 'app-preferences',
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './preferences.html',
  styleUrl: './preferences.scss'
})
export class Preferences {
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

  settings: SettingsCategory = {
    pinEnabled: false,
    lang: '',
    handler: 0,
    loginType: 0,
    shippingType: 0,
    linkEnabled: false,
    storeEnabled: false,
    banner: '',
    maxPcSold: 0,
    showUserData: false,
    whiteListEnabled: false
  };

  constructor(
    private api: ApiService,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('user');
    this.user = stored ? JSON.parse(stored) : null;
    this.loadInitialFilters();
  }

loadSettings(subgroupCode: string) {
  this.settingsService.getSubgroupSettings(subgroupCode).subscribe(res => {
    if (res.success) {
      Object.assign(this.settings, res.settings);
    }
  });
}


  loadInitialFilters() {
    if (this.user.role === 'ADM') 
      this.loadGroups();
    else if (this.user.role === 'SUP') 
      this.loadSubgroups(this.user.belongs);
    else if (this.user.role === 'CAT') 
      this.loadSettings(this.user.belongs);
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

  onGroupChange() {
    this.filters.subgroup = '';
    this.subgroups = [];

    if (this.filters.group) {
      this.loadSubgroups(this.filters.group);
    }
  }

  applyFilters() {
    this.loadSettings(this.filters.subgroup);
  }

  updateSettings() {
    const formData = new FormData();
    formData.append('lang', this.settings.lang);
    formData.append('id_log_type', this.settings.loginType.toString()); 
 
  
/*
    this.api.post<any>('createGroup', formData).subscribe({
      next: (res) => {
        if (res.success) alert('Group saved successfully');
        else this.error = res.error;
      },
      error: (err) => {
        this.error = err.error?.error || err.message;
      }
    });*/

    alert(JSON.stringify(formData));
  }
}
