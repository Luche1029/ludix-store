export interface SidebarItem {
  label: string;
  icon: string;
  route?: string;
  roles?: string[];
  children?: SidebarItem[];
}

export const SIDEBAR_MENU: SidebarItem[] = [
  {
    label: 'sidebar.dashboard',
    icon: 'dashboard',
    route: '/dashboard',
    roles: ['ADM', 'SUP', 'CAT', 'STO']
  },
  {
    label: 'sidebar.orders',
    icon: 'receipt_long',
    route: '/orders',
    roles: ['ADM', 'SUP', 'CAT', 'STO']
  }, 
  {
    label: 'sidebar.groups',
    icon: 'workspaces',
    roles: ['ADM'],
    children: [
      { label: 'Groups List', route: '/groups', icon: 'list' },
      { label: 'Add group', route: '/groups/new', icon: 'add_box' }
    ]
  },
  {
    label: 'sidebar.subgroups',
    icon: 'group_work',
    roles: ['ADM', 'SUP'],
    children: [
      { label: 'sidebar.subgroups_list', route: '/subgroups', icon: 'list' },
      { label: 'sidebar.add_subgroup', route: '/subgroups/new', icon: 'add_circle' }
    ]
  },
  {
    label: 'sidebar.stores',
    icon: 'store',
    roles: ['ADM', 'SUP', 'CAT'],
    children: [
      { label: 'sidebar.stores_list', route: '/stores', icon: 'list' },
      { label: 'sidebar.add_store', route: '/stores/new', icon: 'add_business' }
    ]
  },
   {
    label: 'sidebar.addresses',
    icon: 'location_on',
    roles: ['ADM', 'SUP', 'CAT', 'STO'],
    children: [
      { label: 'Lista indirizzi', route: '/addresses', icon: 'list' },
      { label: 'Nuovo indirizzo', route: '/addresses/new', icon: 'add_location' }
    ]
  },
  {
    label: 'sidebar.settings',
    icon: 'settings',
    roles: ['ADM', 'SUP', 'CAT', 'STO'],
    children: [
      { label: 'Account', route: '/settings/account', icon: 'person' },
   //   { label: 'Preferences', route: '/settings/preferences', icon: 'tune' }
    ]
  },
  {
    label: 'sidebar.editor',
    icon: 'construction',
    roles: ['ADM'],
    children: [
      { 
        label: 'Brand', 
        icon: 'sell', 
        children: [
          { label: 'sidebar.brands_list', route: '/brands', icon: 'list' },
          { label: 'sidebar.add_brand', route: '/brands/new', icon: 'add' }
        ]
      },
      { 
        label: 'Categories', 
        icon: 'category', 
        children: [
          { label: 'sidebar.categories_list', route: '/categories', icon: 'list' },
          { label: 'sidebar.add_category', route: '/categories/new', icon: 'add' }
        ] 
      },
      { 
        label: 'Products', 
        icon: 'memory', 
        children: [
          { label: 'sidebar.product_list', route: '/product', icon: 'list' },
          { label: 'sidebar.add_product', route: '/product/new', icon: 'add' }
        ] 
      },
      { 
        label: 'Presets', 
        icon: 'extension', 
        children: [
          { label: 'sidebar.by_game_app', route: '/by-app', icon: 'sports_esports' },
          { label: 'sidebar.by_price', route: '/by-price', icon: 'attach_money' }
        ]
      },
    ]
  }
];
