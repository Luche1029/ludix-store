import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
})
export class App {
  constructor(private router: Router) {
    const token = localStorage.getItem('auth_token');
    if (!token && this.router.url === '/') {
      this.router.navigate(['/login']);
    }
  }

}
