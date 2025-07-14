import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/auth.service';
import { LoaderService } from '../../../core/loader.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  username = '';
  password = '';
  error = '';

 constructor(
    private auth: AuthService,
    private router: Router,
    private loader: LoaderService
  ) {}

  async submit() {
    this.error = '';
    const success = await this.auth.login(this.username, this.password);
    if (success) {
      this.router.navigate(['/home']);
    } else {
      this.error = 'Email o password non validi.';
    }
  }

}
