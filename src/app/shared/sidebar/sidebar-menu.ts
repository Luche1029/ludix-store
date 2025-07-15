export interface SidebarItem {
  label: string;
  icon: string;
  route?: string;
  roles?: string[];
  children?: SidebarItem[];
}

export const SIDEBAR_MENU: SidebarItem[] = [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    route: '/dashboard',
    roles: ['ADM', 'SUP', 'CAT', 'STO']
  },
  {
    label: 'Orders',
    icon: 'receipt_long',
    route: '/orders',
    roles: ['ADM', 'SUP', 'CAT', 'STO']
  }, 
  {
    label: 'Groups',
    icon: 'group_work',
    roles: ['ADM'],
    children: [
      { label: 'Groups List', route: '/groups', icon: 'list' },
      { label: 'Add group', route: '/groups/new', icon: 'add_circle' }
    ]
  },
  {
    label: 'Categories',
    icon: 'category',
    roles: ['ADM', 'SUP'],
    children: [
      { label: 'Subgroups List', route: '/subgroups', icon: 'list' },
      { label: 'Add subgroup', route: '/subgroups/new', icon: 'add_box' }
    ]
  },
  {
    label: 'Stores',
    icon: 'store',
    roles: ['ADM', 'SUP', 'CAT'],
    children: [
      { label: 'Stores List', route: '/stores', icon: 'list' },
      { label: 'Add Store', route: '/stores/new', icon: 'add_business' }
    ]
  },
   {
    label: 'Addresses',
    icon: 'location_on',
    roles: ['ADM', 'SUP', 'CAT', 'STO'],
    children: [
      { label: 'Addresses List', route: '/addresses', icon: 'list' },
      { label: 'Add Address', route: '/addresses/new', icon: 'add_location' }
    ]
  },
  {
    label: 'Settings',
    icon: 'settings',
    roles: ['ADM', 'SUP', 'CAT', 'STO'],
    children: [
      { label: 'Account', route: '/settings/account', icon: 'person' },
      { label: 'Preferences', route: '/settings/preferences', icon: 'tune' }
    ]
  }
];

