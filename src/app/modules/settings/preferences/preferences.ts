import { Component } from '@angular/core';
import { _, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/core/api.service';
import { SettingsService } from 'src/app/core/settings.service';
import { SettingsCategory, SettingsResponse } from 'src/app/interfaces/settings.interface';
import { Switch} from 'src/app/shared/switch/switch';

@Component({
  selector: 'app-preferences',
  standalone:true,
  imports: [
    TranslateModule,
    CommonModule,
    Switch,
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

  showSettings = false;
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
    this.showSettings = false;
    this.settingsService.getSubgroupSettings(subgroupCode).subscribe(res => {
      if (res.success) {
        Object.assign(this.settings, res.settings);
        this.showSettings = true;
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
    this.showSettings = false;
    this.filters.subgroup = '';
    this.subgroups = [];

    if (this.filters.group) {
      this.loadSubgroups(this.filters.group);
    }
  }

  onSubgroupChange() {
    this.showSettings = false;
  }

  applyFilters() {
    this.loadSettings(this.filters.subgroup);
  }

  updateSettings() {
    const payload = {
      subgroupCode: this.user.role === 'CAT' ? this.user.belongs : this.filters.subgroup, 
      pin_enabled: this.settings.pinEnabled,
      lang: this.settings.lang,
      id_handler: this.settings.handler,
      id_log_type: this.settings.loginType,
      id_shipping_type: this.settings.shippingType,
      view_link: this.settings.linkEnabled,
      store_enabled: this.settings.storeEnabled,
      whitelist: this.settings.whiteListEnabled,
      banner: this.settings.banner,
      max_pc_sold: this.settings.maxPcSold,
      show_user_data: this.settings.showUserData
    };

    this.settingsService.setSubgroupSettings(payload).subscribe(res => {
      if (!res.success) alert('aaaaaaaaaaaaahhhhhhh');
    });


  }
}
