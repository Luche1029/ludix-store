import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './address-form.html',
  styleUrl: './address-form.scss',
})
export class AddressForm {
  formData = {
    label: '',
    contact: '',
    address1: '',
    address2: '',
    zip: '',
    city: '',
    province: '',
    country: '',
    phone: '',
    email: '',
    isDefault: false,
  };

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras?.state;
    if (state?.['address']) {
      this.formData = { ...state['address'] };
    }
  }

  save(): void {
    console.log('Form submitted:', this.formData);
    this.router.navigate(['/addresses']);
  }

  cancel(): void {
    this.router.navigate(['/addresses']);
  }
}
