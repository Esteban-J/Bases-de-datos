import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;

  constructor(private router: Router, private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{ success: boolean }>('http://localhost:3000/login', { username, password })
      .pipe(
        map(response => {
          this.isAuthenticated = response.success;
          if (this.isAuthenticated) {
            this.router.navigate(['/home']);
          }
          return this.isAuthenticated;
        })
      );
  }

  logout() {
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  getAuthStatus() {
    return this.isAuthenticated;
  }
}
