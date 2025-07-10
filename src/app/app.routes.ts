import { Routes } from '@angular/router';


import { Login } from './modules/auth/login/login';
import { Home } from './modules/dashboard/home/home';
import { OrdersList } from './modules/orders/orders-list/orders-list';
import { OrderDetails } from './modules/orders/order-details/order-details';
import { AddressesList } from './modules/addresses/addresses-list/addresses-list';
import { AddressForm } from './modules/addresses/address-form/address-form';
import { StoresList } from './modules/stores/stores-list/stores-list';
import { StoreDetails } from './modules/stores/store-details/store-details';
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
      { path: 'orders', component: OrdersList },
      { path: 'orders/:orderNumber', component: OrderDetails },
      { path: 'addresses', component: AddressesList },
      { path: 'addresses/new', component: AddressForm },
      { path: 'addresses/:id', component: AddressForm },
      { path: 'stores', component: StoresList },
      { path: 'stores/new', component: StoreForm },
      { path: 'stores/:id', component: StoreDetails },
      { path: 'settings/account', component: AccountSettings },
      { path: 'settings/preferences', component: Preferences },
    ],
  },

  { path: '**', redirectTo: 'dashboard' },
];
