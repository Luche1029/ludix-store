import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { Switch } from 'src/app/shared/switch/switch';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-store-details',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    FormsModule,
    Switch,
    TranslateModule],
  templateUrl: './store-details.html',
  styleUrl: './store-details.scss',
})
export class StoreDetails {
  private route = inject(ActivatedRoute);
  code = this.route.snapshot.paramMap.get('code')!;

  channels: any[] = [];

  store = [];

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

  ngOnInit() {
    this.storeCode = this.code;
    this.loadChannels();
    this.loadStoreDetails(this.code);
  }

  loadChannels() {
    this.loading = true;
    this.api.post<any>('getChannels', null).subscribe({
      next: (res) => {
        this.channels = res.channels;
      },
      error: (err) => {
        this.error = 'Error loading group details';
        this.loading = false;
      }
    });
  }

  loadStoreDetails(storeCode: string) {
    this.loading = true;
    this.api.post<any>('getStoreDetails', {storeCode}).subscribe({
      next: (res) => {
        this.name = res.store.name;
        this.admin = res.store.admin;
        this.vat = res.store.vat_number;
        this.address = res.store.address;
        this.zip = res.store.zip;
        this.city = res.store.city;
        this.province = res.store.province;
        this.referent = res.store.referent;
        this.phone = res.store.phone;
        this.mail = res.store.mail;
        this.pin = res.store.pin;
        this.channel = res.store.id_channel;
      },
      error: (err) => {
        this.error = 'Error loading group details';
        this.loading = false;
      }
    });
  }

  submit() {
    const formData = new FormData();

    formData.append('name', this.name);
    formData.append('code', this.storeCode); // <-- attenzione: nel form name="code"
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


  back() {
    this.router.navigate(['/stores']);
  }
}
