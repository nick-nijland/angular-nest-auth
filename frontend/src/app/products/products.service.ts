import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly API = '/api/products';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Product[]>(this.API);
  }

  getOne(id: number) {
    return this.http.get<Product>(`${this.API}/${id}`);
  }
}
