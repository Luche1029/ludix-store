import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'auth_token';
  private userKey = 'user';
  private roleKey = 'role';

  constructor(
    private api: ApiService,
    private router: Router) {}


  async login(username: string, password: string): Promise<boolean> {
    try {
      const res = await this.api.post<any>('login', { username, password }).toPromise();
      if (res && res.success && res.user) {
        localStorage.setItem(this.tokenKey, res.token);
        localStorage.setItem(this.userKey, JSON.stringify(res.user));
        localStorage.setItem(this.roleKey, res.user.role );
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  }


  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    localStorage.removeItem(this.roleKey);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getUser(): any {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  getRole(): string | null {
    const user = this.getUser();
    return user?.role || null;
  }
}
