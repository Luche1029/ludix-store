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
  email = '';
  password = '';
  error = '';

 constructor(
    private auth: AuthService,
    private router: Router,
    private loader: LoaderService
  ) {}
  submit() {
    this.loader.show();
    setTimeout(() => {
      if (this.auth.login(this.email, this.password)) {
        this.router.navigate(['/dashboard']);
      } else {
        this.error = 'Invalid credentials';
      }
      this.loader.hide();
    }, 1000);
}

}
