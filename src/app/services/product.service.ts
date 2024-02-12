import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { PopinService } from './pop-in.service';
import { MailService } from './mail.service';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private baseUrl = 'http://localhost:3000';
  private currentProductSource = new BehaviorSubject<Product | null>(null);
  currentProduct$ = this.currentProductSource.asObservable();
  private cartKey = 'shopping_cart';

  constructor(private http: HttpClient,
              private router: Router,
              private popinService: PopinService,
              private mailService: MailService
              ) {}

  createProduct(productData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/create-product`, productData);
  }

  modifyProduct(productData: any, imageFile: File | null): Observable<any> {
    const url = `${this.baseUrl}/api/modify-product`;
    const formData = new FormData();
    formData.append('product', JSON.stringify(productData));

    if (imageFile) {
      formData.append('image', imageFile, imageFile.name);
    }

    return this.http.put<any>(url, formData).pipe(
      tap(
        response => {
          // Vous pouvez traiter la réponse ici si nécessaire
          console.log('Modification du produit réussie', response);
          this.popinService.showPopin('Profil modifié avec succès');
          this.router.navigate(['/product/display']);
        },
        error => {
          console.error('Erreur lors de la modification du produit', error);
        }
      )
    );
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/api/get-product`);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/get-category`);
  }

  setCurrentProduct(product: Product) {
    this.currentProductSource.next(product);
  }

  addToCart(productId: number, quantity: number): void {
    let cart = this.getCart();
    const productIndex = cart.findIndex(item => item.id === productId);
    if (productIndex > -1) {
      cart[productIndex].quantity += quantity;
    } else {
      cart.push({ id: productId, quantity });
    }
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  getCart(): { id: number; quantity: number }[] {
    const cartJSON = localStorage.getItem(this.cartKey);
    return cartJSON ? JSON.parse(cartJSON) : [];
  }

  getCartDetails() {
    const items = this.getCart();
    return { items };
  }

  removeFromCart(productId: number): void {
    let cart = this.getCart();
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  fetchCartDetails(): Observable<{ items: { id: number; quantity: number }[] }> {
    const cart = this.getCart();
    return of({ items: cart });
  }

  fetchProductsPanier(ids: number[]): Observable<Product[]> {
    return this.http.post<Product[]>(`${this.baseUrl}/api/products-panier`, { ids });
  }
}
