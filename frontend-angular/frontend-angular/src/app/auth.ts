import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = ''; // Use relative URL to backend running in Codespaces

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<string> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { username, password };

    return this.http.post<{ token: string }>(url, body).pipe(
      map(response => response.token)
    );
  }

  getOrders(): Observable<string[]> {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<string[]>(`${this.baseUrl}/orders`, { headers });
  }
}
