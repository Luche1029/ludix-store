import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarItem, SIDEBAR_MENU } from './sidebar-menu';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/auth.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    TranslateModule
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  constructor(
    private router: Router,
    private auth: AuthService) {}
  menu: SidebarItem[] = SIDEBAR_MENU;
  expandedItems = new Set<string>();

  ngOnInit() {
    const role = this.auth.getRole() || '';
    this.menu = this.filterMenuByRole(SIDEBAR_MENU, role);
  }

  filterMenuByRole(menu: SidebarItem[], role: string): SidebarItem[] {
    return menu
      .filter(item => !item.roles || item.roles.includes(role))
      .map(item => {
        if (item.children) {
          const filteredChildren = item.children.filter(child => !child.roles || child.roles.includes(role));
          return { ...item, children: filteredChildren };
        }
        return item;
      })
      .filter(item => !item.children || item.children.length > 0);
  }

  toggle(item: SidebarItem): void {
    if (item.children && item.children.length > 0) {
      if (this.expandedItems.has(item.label)) {
        this.expandedItems.delete(item.label);
      } else {
        this.expandedItems.add(item.label);
      }
    } else if (item.route) {
      this.router.navigate([item.route]);
    }
  }

  isExpanded(item: SidebarItem): boolean {
    return this.expandedItems.has(item.label);
  }

  logout(): void {
    localStorage.clear(); // oppure rimuovi solo il token, es: localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
