import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Switch} from 'src/app/shared/switch/switch';
import { ApiService } from 'src/app/core/api.service';

@Component({
  selector: 'app-store-form',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    FormsModule,
    Switch,
    TranslateModule
  ],
  templateUrl: './store-form.html',
  styleUrl: './store-form.scss',
})
export class StoreForm {
  groups: any[] = [];
  subgroups: any[] = [];
  channels: any[] = [];
  user: any;

  groupCode: string = '';
  subgroupCode: string = '';
  storeCode: string = '';
  channel: number = 0;
  name: string = '';
  vat: string = '';
  address: string = '';
  zip: string = '';
  city: string = '';
  province: string = '';
  referent: string = '';
  phone: string = '';
  mail: string = '';
  pin: string = '';
  admin: boolean = false;   

  loading = false;
  error = '';

  constructor(
    private router: Router,
        private api: ApiService
  ) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('user');
    this.user = stored ? JSON.parse(stored) : null;
    this.loadInitialFilters();
  }

  submit() {
    const formData = new FormData();

    formData.append('name', this.name);
    formData.append('code', this.storeCode); 
    formData.append('vat', this.vat);
    formData.append('address', this.address);
    formData.append('zip', this.zip);
    formData.append('city', this.city);
    formData.append('province', this.province);
    formData.append('referent', this.referent);
    formData.append('phone', this.phone);
    formData.append('mail', this.mail);
    formData.append('pin', this.pin);
    formData.append('channel', `${this.channel}`);
    formData.append('admin', this.admin ? '1' : '0');

    this.api.post<any>('updateStore', formData).subscribe({
      next: (res) => {
        if (res.success) {
          alert('Store updated successfully');
        } else {
          this.error = res.error;
        }
      },
      error: (err) => {
        this.error = err.error?.error || err.message;
      }
    });
  }

  loadInitialFilters() {
    if (this.user.role === 'ADM'){
      this.loadGroups();
    }
    else if (this.user.role === 'SUP') {
      this.loadSubgroups(this.user.belongs);
    }  
    else if (this.user.role === 'CAT') {
     // this.loadStores(this.user.belongs);
    }  
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
    /*this.filters.subgroup = '';
    this.subgroups = [];
    this.stores = [];

    if (this.filters.group) {
      this.loadSubgroups(this.filters.group);
    }    */
    
  }


  back() {
    this.router.navigate(['/stores']);
  }

  save() {

  }
}
