import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private token: string | null;
  private _isLoggedIn = false;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
    this._isLoggedIn = this.token !== null;
  }

  login(username: string, password: string, usertype: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password, usertype })
      .pipe(tap(res => {
        this.setToken(res.token);
        console.log(this.token);
        console.log(username);
        console.log(usertype);
      }));
  }

  logout(): void {
    // clear token
    this.token = null;
    localStorage.removeItem('token');
    this._isLoggedIn = false;
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  getToken(): string | null {
    return this.token;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
    this._isLoggedIn = true;
  }

  clearToken(): void {
    this.token = null;
    localStorage.removeItem('token');
  }

  getLoggedInDoctor(): Observable<Doctor | null> {
    // Assuming your server provides the logged-in doctor's information in the response
    return this.http.get<Doctor>(`${this.apiUrl}/doctor`);
  }
}

interface Doctor {
  name: string;
  specialization: string;
  // Add any other properties of the doctor as needed
}
