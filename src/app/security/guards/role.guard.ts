import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService:AuthService,
    private router:Router){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(!this.authService.isAuthenticated()){
        this.router.navigate(['/login']);
        return false;
      }


      let role = next.data['role'] as string;
      console.log(role);
      if(this.authService.hasRole(role)){
        return true;
      }
      Swal.fire('Acceso denegado',`Hola ${this.authService.usuario.username} no tiene acceso a este recuerso`,'warning');
      this.router.navigate(['/dashboard']);
      return false;
  }
}
