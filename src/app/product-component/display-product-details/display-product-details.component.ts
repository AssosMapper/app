import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth-component/auth-service';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-product-details',
  templateUrl: './display-product-details.component.html',
  styleUrls: ['./display-product-details.component.scss']
})
export class DisplayProductDetailsComponent implements OnInit {


  isAdmin: boolean = this.authService.isAdmin();

  product: Product | null = null;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {

    this.isAdmin = this.authService.isAdmin();

    this.productService.currentProduct$.subscribe(product => {
      this.product = product;
    });
  }

  goToModifyProduct(product: Product) {
    this.productService.setCurrentProduct(product);
    this.router.navigate(['product/modify-product']);
  }

  addToCart(productId: number, quantity: number): void {
    this.productService.addToCart(productId, quantity);
  }
}
