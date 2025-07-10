import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-stores-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './stores-list.html',
  styleUrl: './stores-list.scss',
})
export class StoresList {
  stores = [
    { id: 1, name: 'Main Store', location: 'Milan' },
    { id: 2, name: 'Outlet Store', location: 'Rome' },
    { id: 3, name: 'Web Channel', location: 'Online' },
  ];
}
