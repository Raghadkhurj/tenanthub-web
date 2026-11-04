import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private httpClient = inject(HttpClient);

  login(email: string, password: string, companySlug: string) {
    return this.httpClient
      .post<{ token: string }>(`${environment.apiUrl}/auth/user/login`, {
        email: email,
        password: password,
        companySlug: companySlug,
      })
      .pipe(tap((res) => localStorage.setItem('token', res.token)));
  }
  getToken() {
    return localStorage.getItem('token');
  }
  logout() {
    return localStorage.removeItem('token');
  }
  isLoggedIn() {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const middle = token.split('.')[1];
      const payload = JSON.parse(atob(middle.replace(/-/g, '+').replace(/_/g, '/')));

      if (payload.exp * 1000 < Date.now()) {
        this.logout();
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }
}
