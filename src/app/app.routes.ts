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
import { GroupsList } from './modules/groups/groups-list/groups-list';
import { GroupForm } from './modules/groups/group-form/group-form';
import { GroupDetails } from './modules/groups/group-details/group-details';
import { SubgroupsList } from './modules/subgroups/subgroups-list/subgroups-list';
import { SubgroupForm } from './modules/subgroups/subgroup-form/subgroup-form';
import { SubgroupDetails } from './modules/subgroups/subgroup-details/subgroup-details';

import { AuthGuard } from './core/auth.guard';
import { BrandsList } from './modules/editor/brands/brands-list/brands-list';
import { BrandDetails } from './modules/editor/brands/brand-details/brand-details';
import { BrandForm } from './modules/editor/brands/brand-form/brand-form';

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
      { path: 'groups', component: GroupsList },
      { path: 'groups/new', component: GroupForm },
      { path: 'groups/:id', component: GroupDetails },
      { path: 'subgroups', component: SubgroupsList },
      { path: 'subgroups/new', component: SubgroupForm },
      { path: 'subgroups/:id', component: SubgroupDetails },
      { path: 'brands', component: BrandsList },
      { path: 'brands/new', component: BrandForm },
      { path: 'brands/:id', component: BrandDetails }
    ],
  },

  { path: '**', redirectTo: 'dashboard' },
];
