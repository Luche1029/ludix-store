import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../shared/header/header';
import { Sidebar } from '../../shared/sidebar//sidebar';
import { Router, RouterOutlet } from '@angular/router';
import { Loader } from "../../shared/loader/loader/loader";
import { AuthService } from '../../core/auth.service';

import { Home } from '../dashboard/home/home';
import { OrdersList } from '../orders/orders-list/orders-list';
import { OrderDetails } from '../orders/order-details/order-details';
import { AddressesList } from '../addresses/addresses-list/addresses-list';
import { AddressForm } from '../addresses/address-form/address-form';
import { StoresList } from '../stores/stores-list/stores-list';
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
    OrdersList,
    OrderDetails,
    AddressesList,
    AddressForm,
    StoresList,
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
