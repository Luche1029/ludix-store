import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../shared/header/header';
import { Sidebar } from '../../shared/sidebar//sidebar';
import { Router, RouterOutlet } from '@angular/router';
import { Loader } from "../../shared/loader/loader/loader";
import { AuthService } from '../../core/auth.service';

import { Home } from '../dashboard/home/home';
import { OrderList } from '../orders/order-list/order-list';
import { OrderDetail } from '../orders/order-detail/order-detail';
import { AddressList } from '../addresses/address-list/address-list';
import { AddressForm } from '../addresses/address-form/address-form';
import { StoreList } from '../stores/store-list/store-list';
import { StoreForm } from '../stores/store-form/store-form';
import { AccountSettings } from '../settings/account-settings/account-settings';
import { Preferences } from '../settings/preferences/preferences';

@Component({
  standalone: true,
  selector: 'app-layout',
  imports: [
        CommonModule,
    RouterOutlet,
    Header,
    Sidebar,
    Loader,
    Home,
    OrderList,
    OrderDetail,
    AddressList,
    AddressForm,
    StoreList,
    StoreForm,
    AccountSettings,
    Preferences,
  ],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss'],
})
export class Layout {
  constructor() {
    const router = inject(Router);
    const auth = inject(AuthService);

    if (!auth.isLoggedIn()) {
      router.navigate(['/auth/login']);
    }
  }
}
