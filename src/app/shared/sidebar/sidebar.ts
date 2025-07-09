import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarItem, SIDEBAR_MENU } from './sidebar-menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  constructor(private router: Router) {}
  menu: SidebarItem[] = SIDEBAR_MENU;
  expandedItems = new Set<string>();

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
