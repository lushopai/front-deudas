import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { NotfoundComponent } from './notfound/notfound.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/header/header.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './security/interceptors/authInterceptor';
import { TokenInterceptor } from './security/interceptors/tokenInterceptor';

registerLocaleData(localeES,'es');
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {path:'dashboard', loadChildren: () =>
  import("./dashboard/dashboard.module").then(m => m.DashboardModule)}
  //Carga perezosa , solo para mostrar esos componentes


];
@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    SharedModule,
    HttpClientModule,
    FormsModule




  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' },
    {provide: HTTP_INTERCEPTORS,useClass: AuthInterceptor,multi:true},
    {provide: HTTP_INTERCEPTORS,useClass: TokenInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
