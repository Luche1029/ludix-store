import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'auth_token';

  login(email: string, password: string): boolean {
    if (email === 'admin@ludix.ai' && password === 'admin') {
      const dummyToken = 'mock-jwt-token';
      localStorage.setItem(this.tokenKey, dummyToken);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
