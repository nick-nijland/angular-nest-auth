import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-card">
      <h2>Login</h2>
      <form (ngSubmit)="submit()">
        <input type="email" [(ngModel)]="email" name="email" placeholder="Email" required />
        <input type="password" [(ngModel)]="password" name="password" placeholder="Password" required />
        <p class="error" *ngIf="error">{{ error }}</p>
        <button type="submit">Login</button>
      </form>
      <p>No account? <a routerLink="/auth/register">Register</a></p>
    </div>
  `,
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.error = '';
    this.auth.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/products']),
      error: () => (this.error = 'Invalid email or password'),
    });
  }
}
