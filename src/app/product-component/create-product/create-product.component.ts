import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {

  product: Product = {
    nom: '',
    description: '',
    prix_ht: null,
    prix_ttc: null,
    quantite: null,
    image: ''
  };

  selectedFile: File = null;

  constructor(private productService: ProductService) {}

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  createProduct() {
    const formData = new FormData();
    formData.append('product', JSON.stringify(this.product));
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.productService.createProduct(formData).subscribe(
      response => {
        // Gérez la réponse du serveur
      },
      error => {
        // Gérez les erreurs
      }
    );
  }
}
