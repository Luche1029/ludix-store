export interface SidebarItem {
  label: string;
  icon: string;
  route?: string;
  roles?: string[];
  children?: SidebarItem[];
}

export const SIDEBAR_MENU: SidebarItem[] = [
  {
    label: 'layout.dashboard',
    icon: 'dashboard',
    route: '/dashboard',
    roles: ['ADM', 'SUP', 'CAT', 'STO']
  },
  {
    label: 'layout.orders',
    icon: 'receipt_long',
    route: '/orders',
    roles: ['ADM', 'SUP', 'CAT', 'STO']
  }, 
  {
    label: 'layout.groups',
    icon: 'workspaces',
    roles: ['ADM'],
    children: [
      { label: 'layout.groups_list', route: '/groups', icon: 'list' },
      { label: 'layout.add_group', route: '/groups/new', icon: 'add_box' }
    ]
  },
  {
    label: 'layout.subgroups',
    icon: 'group_work',
    roles: ['ADM', 'SUP'],
    children: [
      { label: 'layout.subgroups_list', route: '/subgroups', icon: 'list' },
      { label: 'layout.add_subgroup', route: '/subgroups/new', icon: 'add_circle' }
    ]
  },
  {
    label: 'layout.stores',
    icon: 'store',
    roles: ['ADM', 'SUP', 'CAT'],
    children: [
      { label: 'layout.stores_list', route: '/stores', icon: 'list' },
      { label: 'layout.add_store', route: '/stores/new', icon: 'add_business' }
    ]
  },
   {
    label: 'layout.addresses',
    icon: 'location_on',
    roles: ['ADM', 'SUP', 'CAT', 'STO'],
    children: [
      { label: 'layout.addresses_list', route: '/addresses', icon: 'list' },
      { label: 'layout.new_address', route: '/addresses/new', icon: 'add_location' }
    ]
  },
  {
    label: 'layout.settings',
    icon: 'settings',
    roles: ['ADM', 'SUP', 'CAT', 'STO'],
    children: [
      { label: 'Account', route: '/settings/account', icon: 'person' },
   //   { label: 'Preferences', route: '/settings/preferences', icon: 'tune' }
    ]
  },
  {
    label: 'layout.editor',
    icon: 'construction',
    roles: ['ADM'],
    children: [
      { 
        label: 'Brand', 
        icon: 'sell', 
        children: [
          { label: 'layout.brands_list', route: '/brands', icon: 'list' },
          { label: 'layout.add_brand', route: '/brands/new', icon: 'add' }
        ]
      },
      { 
        label: 'layout.categories', 
        icon: 'category', 
        children: [
          { label: 'layout.categories_list', route: '/categories', icon: 'list' },
          { label: 'layout.add_category', route: '/categories/new', icon: 'add' }
        ] 
      },
      { 
        label: 'layout.products', 
        icon: 'memory', 
        children: [
          { label: 'layout.product_list', route: '/product', icon: 'list' },
          { label: 'layout.add_product', route: '/product/new', icon: 'add' }
        ] 
      },
      { 
        label: 'layout.presets', 
        icon: 'extension', 
        children: [
          { label: 'layout.by_game_app', route: '/by-app', icon: 'sports_esports' },
          { label: 'layout.by_price', route: '/by-price', icon: 'attach_money' }
        ]
      },
    ]
  }
];
