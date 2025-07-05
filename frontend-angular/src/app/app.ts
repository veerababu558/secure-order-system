import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div style="max-width: 400px; margin: 40px auto; text-align: center;">
      <h2>🔐 Spring Boot + Angular JWT Login</h2>

      <input type="text" [(ngModel)]="username" placeholder="Username" class="form-control" /><br />
      <input type="password" [(ngModel)]="password" placeholder="Password" class="form-control" /><br />

      <button (click)="login()">Login</button>
      <button (click)="loadOrders()">Get Orders</button>

      <p style="margin-top: 20px;">{{ message }}</p>
    </div>
  `,
})
export class AppComponent {
  username = '';
  password = '';
  message = '';

  constructor(private auth: AuthService) {}

  login() {
    this.auth.login(this.username, this.password).subscribe({
      next: (token) => {
        localStorage.setItem('jwt', token);
        this.message = '✅ Login successful. Token saved.';
      },
      error: () => {
        this.message = '❌ Login failed. Check credentials.';
      },
    });
  }

  loadOrders() {
    this.auth.getOrders().subscribe({
      next: (orders) => {
        this.message = `✅ Orders: ${orders}`;
      },
      error: () => {
        this.message = '❌ Failed to fetch orders. Login first?';
      },
    });
  }
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(FormsModule),
  ],
});
