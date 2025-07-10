import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-store-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './store-details.html',
  styleUrl: './store-details.scss',
})
export class StoreDetails {
  store = {
    name: 'Main Store',
    code: 'STR001',
    location: 'Milan',
    type: 'Retail',
    manager: 'Alice Bianchi',
    contact: 'alice@store.com',
    phone: '+39 02 1234567',
    active: true
  };

  constructor(private router: Router) {}

  back() {
    this.router.navigate(['/stores']);
  }
}
