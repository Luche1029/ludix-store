import { Routes } from '@angular/router';


import { Login } from './modules/auth/login/login';
import { Home } from './modules/dashboard/home/home';
import { OrderList } from './modules/orders/order-list/order-list';
import { OrderDetail } from './modules/orders/order-detail/order-detail';
import { AddressList } from './modules/addresses/address-list/address-list';
import { AddressForm } from './modules/addresses/address-form/address-form';
import { StoreList } from './modules/stores/store-list/store-list';
import { StoreForm } from './modules/stores/store-form/store-form';
import { AccountSettings } from './modules/settings/account-settings/account-settings';
import { Preferences } from './modules/settings/preferences/preferences';
import { Layout } from './modules/layout/layout';

import { AuthGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  
  { path: 'login', component: Login },
  // Protected routes with layout
  {
    path: '',
    component: Layout,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: Home },
      { path: 'orders', component: OrderList },
      { path: 'orders/:id', component: OrderDetail },
      { path: 'addresses', component: AddressList },
      { path: 'addresses/new', component: AddressForm },
      { path: 'addresses/:id', component: AddressForm },
      { path: 'stores', component: StoreList },
      { path: 'stores/new', component: StoreForm },
      { path: 'stores/:id', component: StoreForm },
      { path: 'settings/account', component: AccountSettings },
      { path: 'settings/preferences', component: Preferences },
    ],
  },

  { path: '**', redirectTo: 'dashboard' },
];
