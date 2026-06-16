import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-card">
      <h2>Create account</h2>
      <form (ngSubmit)="submit()">
        <input type="text" [(ngModel)]="name" name="name" placeholder="Name" />
        <input type="email" [(ngModel)]="email" name="email" placeholder="Email" required />
        <input type="password" [(ngModel)]="password" name="password" placeholder="Password (min 6)" required />
        <p class="error" *ngIf="error">{{ error }}</p>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a routerLink="/auth/login">Login</a></p>
    </div>
  `,
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.error = '';
    this.auth.register(this.email, this.password, this.name).subscribe({
      next: () => this.router.navigate(['/products']),
      error: (err) => (this.error = err.error?.message ?? 'Registration failed'),
    });
  }
}
