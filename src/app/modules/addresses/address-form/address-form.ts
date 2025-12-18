import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Switch} from 'src/app/shared/switch/switch';
import { ApiService } from 'src/app/core/api.service';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Switch,
    TranslateModule,
],
  templateUrl: './address-form.html',
  styleUrl: './address-form.scss',
})
export class AddressForm {
  loading = true;
  error = '';
  user: any;
  groups: any[] = [];
  subgroups: any[] = [];
  stores: any[] = [];

  storeCode = '';
  filters = {
    group: '',
    subgroup: '',
    store: ''
  };

  formData = {
    id: 0,
    label: '',
    vat_number: '',
    referent: '',
    address1: '',
    address2: '',
    zip: '',
    city: '',
    province: '',
    country: '',
    phone: '',
    email: '',
    isDefault: false,
  };

  state:any = null;

  constructor(
    private router: Router,
    private api: ApiService
  ) {

    this.state = this.router.getCurrentNavigation()?.extras?.state;
    if (this.state?.['address']) {
      this.formData = { ...this.state['address'] };
      this.storeCode = this.state['address'].store_code;
    }
  }
  

  ngOnInit() {
    const stored = localStorage.getItem('user');
    this.user = stored ? JSON.parse(stored) : null;
    if (this.user.role === 'ADM') {
      this.loadGroups();
    }
    else if (this.user.role === 'SUP') {
      this.filters.group = this.user.belongs;
      this.loadSubgroups(this.filters.group);
    }
    else if (this.user.role === 'CAT') {
      this.filters.subgroup = this.user.belongs;
      this.loadStores(this.filters.subgroup);
    }
    else if (this.user.role === 'STO') {
      this.storeCode = this.user.belongs;
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

  onStoreChange() {
    this.storeCode = this.filters.store;
  }

  loadStoreDetails(storeCode: string) {
    this.loading = true;
    this.api.post<any>('getStoreDetails', {storeCode}).subscribe({
      next: (res) => {
        this.formData.vat_number = res.store.vat_number;
      },
      error: (err) => {
        this.error = 'Error loading group details';
        this.loading = false;
      }
    });
  }

  save(): void {

    const payload = {
      storeCode: this.storeCode,
      label: this.formData.label,
      vat_number: this.formData.vat_number,
      address1: this.formData.address1,
      address2: this.formData.address2,
      zip: this.formData.zip,
      city: this.formData.city,
      province: this.formData.province,
      country: this.formData.country,
      referent: this.formData.referent,
      phone: this.formData.phone,
      mail: this.formData.email,
      def: this.formData.isDefault
    }
    
    this.api.post<any>('/createAddress', payload).subscribe({
        next: (res) => {
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error saving address';
        this.loading = false;
      }
    });
    this.router.navigate(['/addresses']);
  }

  update(): void {
    
    const payload = {
      addressId: this.formData.id,
      storeCode: this.storeCode,
      label: this.formData.label,
      vat_number: this.formData.vat_number,
      address1: this.formData.address1,
      address2: this.formData.address2,
      zip: this.formData.zip,
      city: this.formData.city,
      province: this.formData.province,
      country: this.formData.country,
      referent: this.formData.referent,
      phone: this.formData.phone,
      mail: this.formData.email,
      def: this.formData.isDefault
    }

    this.api.post<any>('/updateAddress', payload).subscribe({
        next: (res) => {
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error saving address';
        this.loading = false;
      }
    });
    this.router.navigate(['/addresses']);
  }

  cancel(): void {
    this.router.navigate(['/addresses'], { state: { filters: this.filters } });
  }
}
