import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './views/error-page/error-page.component';
import { Error404PageComponent } from './views/error404-page/error404-page.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { LoginComponent } from './auth-component/login/login.component';
import { RegisterComponent } from './auth-component/register/register.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: "",
    component: HomePageComponent,
  },
  {
    path: "error",
    component: ErrorPageComponent,
  },
  {
    path: "404error",
    component: Error404PageComponent,
  },
  {
    path: "auth",
    loadChildren: () => import('./auth-component/auth.module').then(m => m.AuthModule)
  },
  {
    path: "product",
    loadChildren: () => import('./product-component/product.module').then(m => m.ProductModule)
  },
  {
    path: "admin",
    loadChildren: () => import('./admin-component/admin.module').then(m => m.AdminModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
