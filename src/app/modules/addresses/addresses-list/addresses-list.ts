import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-addresses-list',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  templateUrl: './addresses-list.html',
  styleUrl: './addresses-list.scss',
})
export class AddressesList {
  addresses = [
    {
      label: 'Home',
      contact: 'John Doe',
      address1: '123 Main Street',
      address2: '',
      city: 'New York',
      province: 'NY',
      zip: '10001',
      country: 'USA',
      phone: '+1 555 123456',
      email: 'john@example.com',
      isDefault: true,
    },
    {
      label: 'Office',
      contact: 'John Doe',
      address1: '456 Office Park',
      address2: 'Floor 3',
      city: 'New York',
      province: 'NY',
      zip: '10002',
      country: 'USA',
      phone: '+1 555 987654',
      email: 'john.office@example.com',
      isDefault: false,
    },
  ];

  constructor(private router: Router) {}

  editAddress(address: any): void {
    this.router.navigate(['/addresses/new'], { state: { address } });
  }

  addAddress(): void {
    this.router.navigate(['/addresses/new']);
  }
}
