import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { StripePaymentService } from 'src/app/services/stripe-payment.service';
import { AuthService } from 'src/app/services/auth-service';

declare var Stripe: any;

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {

  private cartKey = 'shopping_cart';
  cartItems: any[] = [];
  cartItemsDetailed: any[] = [];
  total = 0;
  stripe: any;
  card: any;
  userId: number | null = null; // Ajouté pour stocker l'ID de l'utilisateur

  constructor(
    private productService: ProductService,
    private stripeService: StripePaymentService,
    private authService: AuthService // Ajouté pour accéder aux informations de l'utilisateur
  ) {}

  ngOnInit(): void {
    this.productService.fetchCartDetails().subscribe({
      next: ({ items }) => {
        this.cartItems = items;
      },
      error: (error) => console.error('Erreur lors de la récupération des détails du panier', error),
    });

    this.loadProductDetails();

    this.stripe = Stripe('pk_test_51OhM9YJKlJN4VTLdZYYZFEUyiWEyT9VXOMejcYud1e1aO1W3mBZChJihOZogSXtqVKV0dXT8waaBGYZDZMMpvED900sFtlD4yV');

    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.userId = user.id; // Stockez l'ID de l'utilisateur pour l'utiliser lors du paiement
      }
    });

    this.loadProductDetails();

    this.stripe = Stripe('pk_test_51OhM9YJKlJN4VTLdZYYZFEUyiWEyT9VXOMejcYud1e1aO1W3mBZChJihOZogSXtqVKV0dXT8waaBGYZDZMMpvED900sFtlD4yV');

    // this.initStripe();

  }

  loadProductDetails() {
    const cart = JSON.parse(localStorage.getItem('shopping_cart') || '[]');
    const productIds = cart.map(item => item.id);

    if (productIds.length > 0) {
      this.productService.fetchProductsPanier(productIds).subscribe(products => {
        this.cartItemsDetailed = products.map(product => {
          const { quantity } = cart.find(item => item.id === product.id) || { quantity: 0 };
          // Assurez-vous que les champs correspondants sont retournés par votre API
          return {
            ...product,
            quantity,
            // Utilisez ici les propriétés exactes retournées par l'API
            prix_ht: product.prix_ht,
            prix_ttc: product.prix_ttc,
          };
        });

        this.total = this.cartItemsDetailed.reduce((acc, product) => acc + (product.prix_ttc * product.quantity), 0);

      });
    }
  }

  removeProductCompletely(productId: number): void {
    this.productService.removeFromCart(productId);
    this.loadProductDetails();
  }

  decreaseQuantity(productId: number): void {
    let cart = this.productService.getCart();
    const productIndex = cart.findIndex(item => item.id === productId);
    if (productIndex !== -1) {
      if (cart[productIndex].quantity > 1) {
        cart[productIndex].quantity -= 1;
      } else {
        cart.splice(productIndex, 1);
      }
      localStorage.setItem(this.cartKey, JSON.stringify(cart));
    }
    this.loadProductDetails();
  }

  addToCart(productId: number, quantity: number): void {
    this.productService.addToCart(productId, quantity);
    this.loadProductDetails();
  }

  pay() {
    if (!this.userId) {
      alert('Vous devez être connecté pour effectuer cette action.');
      return;
    }
    const items = this.cartItemsDetailed.map(item => ({
      productId: item.id,
      quantity: item.quantity,
      amount: item.prix_ttc * 100, // Le montant doit être en centimes pour Stripe
    }));

    this.stripeService.createCheckoutSession(this.userId, items).subscribe({
      next: (session) => {
        this.stripe.redirectToCheckout({
          sessionId: session.id,
        }).then((result: any) => {
          if (result.error) {
            // Gérer l'erreur ici, par exemple afficher un message à l'utilisateur
            alert(result.error.message);
          }
        });
      },
      error: (error) => console.error('Erreur lors de la création de la session de paiement', error),
    });
  }

}

