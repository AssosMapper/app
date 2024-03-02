import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ErrorPageComponent } from './views/error-page/error-page.component';
import { Error404PageComponent } from './views/error404-page/error404-page.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { DatePipe } from '@angular/common';
import { SharedModule } from './shared-component/shared-module';
import { AdminModule } from './admin-component/admin.module';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth-component/auth.effects';
import { StoreModule } from '@ngrx/store';
import { ActionReducerMap } from '@ngrx/store';
import { metaReducers, reducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    Error404PageComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AdminModule,
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 25 }) : [],
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }






