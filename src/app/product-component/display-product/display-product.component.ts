import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth-service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-display-product',
  templateUrl: './display-product.component.html',
  styleUrls: ['./display-product.component.scss']
})
export class DisplayProductComponent implements OnInit {

  isAdmin: boolean = this.authService.isAdmin();

  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: any[] = [];
  selectedCategory = 'all';
  searchTerm = '';

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    ) { }

  ngOnInit(): void {

    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        console.log('Produits récupérés:', data);
        this.products = this.isAdmin ? data : data.filter(p => p.actif == true);
        this.filteredProducts = [...this.products];
      },
      error => {
        console.error('Erreur lors de la récupération des produits', error);
      }
    );

    console.log(this.products);

    this.productService.getCategories().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.error('Erreur lors de la récupération des catégories', error);
      }
    );
  }

  filterProducts(): void {
    console.log('Catégorie sélectionnée:', this.selectedCategory);
    console.log('Terme de recherche:', this.searchTerm);

    let tempProducts = this.isAdmin ? this.products : this.products.filter(p => p.actif == true);

    // Filtrage par catégorie
    if (this.selectedCategory !== 'all') {
      console.log('Filtrage par catégorie');
      tempProducts = tempProducts.filter(p => {
        console.log(`Comparaison: ${p.category_id} === ${Number(this.selectedCategory)}`);
        return p.category_id === Number(this.selectedCategory);
      });
    }

    // Recherche
    if (this.searchTerm) {
      console.log('Filtrage par recherche');
      tempProducts = tempProducts.filter(p => p.nom.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }

    console.log('Produits filtrés:', tempProducts);
    this.filteredProducts = tempProducts;
  }


  sortProducts(order: 'asc' | 'desc'): void {
    console.log('Ordre de tri:', order); // Log pour déboguer l'ordre de tri
    if (order === 'asc') {
      this.filteredProducts.sort((a, b) => a.prix_ht - b.prix_ht);
    } else {
      this.filteredProducts.sort((a, b) => b.prix_ht - a.prix_ht);
    }

    console.log('Produits triés:', this.filteredProducts); // Log pour déboguer les produits après tri
  }

  viewProductDetails(product: Product) {
    this.productService.setCurrentProduct(product);
    this.router.navigate(['product/details', product.id]);
  }

  goToModifyProduct(product: Product) {
    this.productService.setCurrentProduct(product);
    this.router.navigate(['product/modify-product']);
  }

  addToCart(productId: number, quantity: number): void {
    this.productService.addToCart(productId, quantity);
  }
}
