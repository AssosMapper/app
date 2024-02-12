// stripe-payment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class StripePaymentService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createCheckoutSession(userId: number, items: any[]) {
    return this.http.post<{ id: string }>(
      `${this.baseUrl}/api/create-payment`,
      {
        userId: userId, // L'ID de l'utilisateur connecté
        items: items,   // Les articles du panier avec leur prix, quantité, etc.
        amount: items.reduce((total, item) => total + (item.amount * item.quantity), 0), // Calcul du montant total en centimes
      }
    );
  }
}
