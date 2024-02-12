import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from "@angular/common";
import { FormsModule } from '@angular/forms';
import { ButtonDarkComponent } from './items/button-dark/button-dark.component';
import { PopinComponent } from './items/pop-in/pop-in.component';
import { ProgressBarComponent } from './items/progress-bar/progress-bar.component';
import { ContactComponent } from './contact/contact.component';
import { NavbarComponent } from './items/navbar/navbar.component';

export const homeRoutes: Routes = [];

@NgModule({
  declarations: [
    ButtonDarkComponent,
    PopinComponent,
    ProgressBarComponent,
    ContactComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(homeRoutes),
  ],
  exports: [
    PopinComponent,
    ProgressBarComponent,
    ButtonDarkComponent,
    ContactComponent,
    NavbarComponent
  ],
})
export class SharedModule { }
