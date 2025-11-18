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
    label: 'Ordini',
    icon: 'receipt_long',
    route: '/orders',
    roles: ['ADM', 'SUP', 'CAT', 'STO']
  }, 
  {
    label: 'Groups',
    icon: 'workspaces',
    roles: ['ADM'],
    children: [
      { label: 'Groups List', route: '/groups', icon: 'list' },
      { label: 'Add group', route: '/groups/new', icon: 'add_box' }
    ]
  },
  {
    label: 'Subgroups',
    icon: 'group_work',
    roles: ['ADM', 'SUP'],
    children: [
      { label: 'Subgroups List', route: '/subgroups', icon: 'list' },
      { label: 'Add subgroup', route: '/subgroups/new', icon: 'add_circle' }
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
    label: 'Indirizzi',
    icon: 'location_on',
    roles: ['ADM', 'SUP', 'CAT', 'STO'],
    children: [
      { label: 'Lista indirizzi', route: '/addresses', icon: 'list' },
      { label: 'Nuovo indirizzo', route: '/addresses/new', icon: 'add_location' }
    ]
  },
  {
    label: 'Impostazioni',
    icon: 'settings',
    roles: ['ADM', 'SUP', 'CAT', 'STO'],
    children: [
      { label: 'Account', route: '/settings/account', icon: 'person' },
   //   { label: 'Preferences', route: '/settings/preferences', icon: 'tune' }
    ]
  },
  {
    label: 'Editor',
    icon: 'construction',
    roles: ['ADM'],
    children: [
      { 
        label: 'Brand', 
        icon: 'sell', 
        children: [
          { label: 'Brands List', route: '/brands', icon: 'list' },
          { label: 'Add Brand', route: '/brands/new', icon: 'add' }
        ]
      },
      { 
        label: 'Categories', 
        icon: 'category', 
        children: [
          { label: 'Categories List', route: '/categories', icon: 'list' },
          { label: 'Add Category', route: '/categories/new', icon: 'add' }
        ] 
      },
      { 
        label: 'Products', 
        icon: 'memory', 
        children: [
          { label: 'Product List', route: '/product', icon: 'list' },
          { label: 'Add Product', route: '/product/new', icon: 'add' }
        ] 
      },
      { 
        label: 'Presets', 
        icon: 'extension', 
        children: [
          { label: 'By Game / App', route: '/by-app', icon: 'sports_esports' },
          { label: 'By Price', route: '/by-price', icon: 'attach_money' }
        ]
      },
    ]
  }
];
