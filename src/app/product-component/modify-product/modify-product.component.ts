import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { DatePipe } from '@angular/common';
import { format } from 'date-fns';

@Component({
  selector: 'app-modify-product',
  templateUrl: './modify-product.component.html',
  styleUrls: ['./modify-product.component.scss']
})
export class ModifyProductComponent implements OnInit {

  product: Product;
  selectedFile: File = null;
  categories: any[] = []; // Ajoutez cette ligne

  constructor(private productService: ProductService, private datePipe: DatePipe) {}

  ngOnInit() {
    this.productService.currentProduct$.subscribe(productData => {
      if (productData) {
        this.product = productData;
        console.log('Produit à modifier:', this.product);
      } else {
        console.log('Aucun produit sélectionné pour modification.');
      }
    });
    this.getCategories();
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  updateProduct() {
    if (!this.product) {
      console.error('Aucun produit à modifier.');
      return;
    }

    // Appel du service pour mettre à jour le produit
    this.productService.modifyProduct(this.product, this.selectedFile).subscribe(
      response => {
        console.log('Modification du produit réussie', response);
        // Vous pouvez rediriger l'utilisateur ou afficher un message de succès
      },
      error => {
        console.error('Erreur lors de la modification du produit', error);
        // Gérer l'erreur, par exemple en affichant un message d'erreur
      }
    );
  }




  getCategories() {
    // Exemple: récupération des catégories depuis ProductService
    this.productService.getCategories().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.error('Erreur lors de la récupération des catégories', error);
      }
    );
  }

}
