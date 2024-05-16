import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,private router:Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          if(this.authService.isAuthenticated()){
            this.authService.logout();
          }
          this.router.navigate(['/login']);
        }
        if(error.status === 403){
          Swal.fire(
            'Acceso denegado',
            `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`,
            'warning'
          );
          this.router.navigate(['/clientes']);
        }
        return throwError(() => error);
      })
    );
  }
}
