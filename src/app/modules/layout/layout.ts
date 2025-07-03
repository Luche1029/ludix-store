import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../shared/header/header';
import { Sidebar } from '../../shared/sidebar//sidebar';
import { Router, RouterOutlet } from '@angular/router';
import { Loader } from "../../shared/loader/loader/loader";
import { AuthService } from '../../core/auth.service';

@Component({
  standalone: true,
  selector: 'app-layout',
  imports: [CommonModule, Header, Sidebar, RouterOutlet, Loader],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss'],
})
export class Layout {
  constructor() {
    const router = inject(Router);
    const auth = inject(AuthService);

    if (!auth.isLoggedIn()) {
      router.navigate(['/auth/login']);
    }
  }
}
