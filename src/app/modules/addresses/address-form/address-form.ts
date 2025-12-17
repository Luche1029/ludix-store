import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Switch} from 'src/app/shared/switch/switch';
import { ApiService } from 'src/app/core/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    Switch,
    TranslateModule
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

  filters = {
    group: '',
    subgroup: '',
    store: ''
  };

  formData = {
    label: '',
    vat_number: '',
    contact: '',
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

  constructor(
    private router: Router,
    private api: ApiService
  ) {

    const state = this.router.getCurrentNavigation()?.extras?.state;
    if (state?.['address']) {
      this.formData = { ...state['address'] };
    }
  }
  
  private route = inject(ActivatedRoute);
  storeCode = this.route.snapshot.paramMap.get('sc')!;

  ngOnInit() {
    const stored = localStorage.getItem('user');
    this.user = stored ? JSON.parse(stored) : null;
    this.loadGroups();
    if (['SUP', 'CAT', 'STO'].includes(this.user.role)) {
      //this.filters.group = this.user.groupCode;
      this.loadSubgroups(this.filters.group);
    }
    if (['CAT', 'STO'].includes(this.user.role)) {
      this.filters.subgroup = this.user.subgroupCode;
      this.loadStores(this.filters.subgroup);
    }
    if (this.user.role === 'STO') {
      this.filters.store = this.user.storeCode;
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
      referent: this.formData.contact,
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

  cancel(): void {
    this.router.navigate(['/addresses']);
  }
}
