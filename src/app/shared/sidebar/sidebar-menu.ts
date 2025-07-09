export interface SidebarItem {
  label: string;
  icon: string;
  route?: string;
  children?: SidebarItem[];
}

export const SIDEBAR_MENU: SidebarItem[] = [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    route: '/dashboard'
  },
  {
    label: 'Orders',
    icon: 'receipt_long',
    route: '/orders'
  },
  {
    label: 'Addresses',
    icon: 'location_on',
    children: [
      { label: 'Addresses List', route: '/addresses', icon: 'list' },
      { label: 'Add Address', route: '/addresses/new', icon: 'add_location' }
    ]
  },
  {
    label: 'Stores',
    icon: 'store',
    children: [
      { label: 'Stores List', route: '/stores', icon: 'list' },
      { label: 'Add Store', route: '/stores/new', icon: 'add_business' }
    ]
  },
  {
    label: 'Settings',
    icon: 'settings',
    children: [
      { label: 'Account', route: '/settings/account', icon: 'person' },
      { label: 'Preferences', route: '/settings/preferences', icon: 'tune' }
    ]
  }
];

