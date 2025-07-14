import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'auth_token';
  private userKey = 'user_data';

  constructor(private api: ApiService) {}

  login(username: string, password: string): Promise<boolean> {
    return this.api.post<any>('loginUser', {
      username: username,
      psw: password
    }).toPromise().then(res => {
      if (res.success) {
        localStorage.setItem(this.tokenKey, 'mock-token'); // sostituibile con token reale
        localStorage.setItem(this.userKey, JSON.stringify(res.user));
        return true;
      }
      return false;
    }).catch(() => false);
  }


  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

   getUser(): any {
    return JSON.parse(localStorage.getItem(this.userKey) || 'null');
  }
}
