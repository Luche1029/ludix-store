import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule,
    TranslateModule
  ],
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

  constructor(private router: Router) { }

  save() {
    alert('Account saved (static)');
  }

  cancel(): void {
    this.router.navigate(['/settings/account']);
  }
}
