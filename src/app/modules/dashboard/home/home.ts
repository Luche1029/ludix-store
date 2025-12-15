import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from 'src/app/core/api.service';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
  TranslateModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})


export class Home {

  user: any;
  role: any;
  data:any;

  loading = false;
  error = '';

  constructor(
    private auth: AuthService,
      private api: ApiService) {}


  ngOnInit() {
    this.user = this.auth.getUser();
    this.role = this.auth.getRole();
    this.loadDashboardData(this.role, this.user.belongs)
  }

  loadDashboardData(role: string, ref: string) {
      this.api.post<any>('getDashboardData', {role, ref}).subscribe({
      next: (res) => {
        this.data = res.data;
      },
      error: (err) => {
        this.error = 'Error loading group details';
        this.loading = false;
      }
    });
  }
}
