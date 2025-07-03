import { Component } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header {
  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
