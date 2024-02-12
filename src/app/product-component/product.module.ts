import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './create-product/create-product.component';
import { SharedModule } from '../shared-component/shared-module';
import { FormsModule } from '@angular/forms';
import { DisplayProductComponent } from './display-product/display-product.component';
import { DisplayProductDetailsComponent } from './display-product-details/display-product-details.component';
import { AdminGuard } from '../guards/admin.guard';
import { ModifyProductComponent } from './modify-product/modify-product.component';
import { PanierComponent } from './panier/panier.component';

export const productRoutes: Routes = [
  {
    path: "create",
    component: CreateProductComponent,
  },
  {
    path: "display",
    component: DisplayProductComponent,
  },
  {
    path: "details/:id",
    component: DisplayProductDetailsComponent,
  },
  {
    path: "modify-product",
    component: ModifyProductComponent,
    canActivate: [AdminGuard],
  },
  {
    path: "panier",
    component: PanierComponent,
  },
];

@NgModule({
  declarations: [
    CreateProductComponent,
    DisplayProductComponent,
    DisplayProductDetailsComponent,
    ModifyProductComponent,
    PanierComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(productRoutes),
  ]
})
export class ProductModule { }
