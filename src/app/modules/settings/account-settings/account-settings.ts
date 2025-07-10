import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './account-settings.html',
  styleUrl: './account-settings.scss',
})
export class AccountSettings {
  user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+39 333 1234567',
    password: ''
  };

  save() {
    alert('Account saved (static)');
  }
}
