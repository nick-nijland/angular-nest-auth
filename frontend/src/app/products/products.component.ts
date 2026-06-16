import { Component, inject, signal, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Product, ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  template: `
    <div class="container">
      <header>
        <h1>Products</h1>
        <button (click)="auth.logout()">Logout</button>
      </header>
      @if (loading()) {
        <p>Loading...</p>
      }
      @if (error()) {
        <p class="error">{{ error() }}</p>
      }
      <ul class="product-list">
        @for (p of products(); track p.id) {
          <li class="product-card">
            <strong>{{ p.name }}</strong>
            <span>{{ p.description }}</span>
            <span class="price">\${{ p.price }}</span>
            <span class="stock">Stock: {{ p.stock }}</span>
          </li>
        }
      </ul>
    </div>
  `,
})
export class ProductsComponent implements OnInit {
  auth = inject(AuthService);
  private productsService = inject(ProductsService);

  products = signal<Product[]>([]);
  loading = signal(true);
  error = signal('');

  ngOnInit() {
    this.productsService.getAll().subscribe({
      next: (data) => { this.products.set(data); this.loading.set(false); },
      error: () => { this.error.set('Failed to load products'); this.loading.set(false); },
    });
  }
}
