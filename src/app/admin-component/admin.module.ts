import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from "@angular/common";
import { SharedModule } from '../shared-component/shared-module';
import { FormsModule } from '@angular/forms';
import { AdminInterfaceComponent } from './admin-interface/admin-interface.component';
import { AdminGuard } from '../guards/admin.guard';

export const adminRoutes: Routes = [
  {
    path: "interface",
    component: AdminInterfaceComponent,
    canActivate: [AdminGuard]
  },
];

@NgModule({
  declarations: [
    AdminInterfaceComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(adminRoutes),
  ]
})
export class AdminModule { }
