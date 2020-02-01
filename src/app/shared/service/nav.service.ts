import { Injectable } from '@angular/core';

export interface Menu {
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  active?: boolean;
  children?: Menu[];
}

@Injectable({
  providedIn: 'root'
})
export class NavService {
  collapseSidebar: boolean = false;

  constructor() { }

  MenuItems: Menu[] = [
    {
      path: '/dashboard/default', title: 'Dashboard', icon: 'home', type: 'link', active: true
    },
    {
      title: 'Products', icon: 'box', type: 'sub', active: false, children: [
        {
          title: 'Physical', type: 'sub', children: [
            {
              path: '/products/physical/product-list', title: 'Product List', type: 'link', active: false
            },
            {
              path: '/products/physical/add-product', title: 'Add Product', type: 'link', active: false
            }
          ]
        }
      ]
    },
    {
      title: 'Sales', icon: 'dollar-sign', type: 'sub', active: false, children: [
        { path: '/sales/orders', title: 'Orders', type: 'link', active: false },
        { path: '/sales/transactions', title: 'Transactions', type: 'link', active: false }
      ]
    },
    {
      title: 'Masters', icon: 'clipboard', type: 'sub', active: false, children: [
        { path: '/masters/brandlogo', title: 'Brand Logo Master', type: 'link', active: false },
        { path: '/masters/category', title: 'Category Master', type: 'link', active: false },
        { path: '/masters/color', title: 'Color Master', type: 'link', active: false },
        { path: '/masters/size', title: 'Size Master', type: 'link', active: false },
        { path: '/masters/tag', title: 'Tag Master', type: 'link', active: false },
        { path: '/masters/usertype', title: 'User Type Master', type: 'link', active: false },
      ]
    },
    {
      title: 'Users', icon: 'user-plus', type: 'sub', active: false, children: [
        { path: '/users/list-user', title: 'User List', type: 'link', active: false },
        { path: '/users/create-user', title: 'Create User', type: 'link', active: false }
      ]
    },
    {
      title: 'Settings', icon: 'settings', type: 'sub', active: false, children:
        [
          { path: '/settings/profile', title: 'Profile', type: 'link', active: false },
        ]
    },
    { path: '/reports', title: 'Reports', icon: 'bar-chart', type: 'link', active: false },
    { path: '/invoice', title: 'Invoice', icon: 'archive', type: 'link', active: false },
    { path: '/auth/login', title: 'Login', icon: 'log-in', type: 'link', active: false }
  ];


 // items = this.MenuItems;
}
