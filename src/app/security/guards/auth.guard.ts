import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private  authService:AuthService,
  private router:Router){

}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.isAuthenticated()){
      if(this.isTokenExpirado()){
        this.authService.logout();
        this.router.navigate(['/login']);
        return false;
      }
      return true;

    }
    this.router.navigate(['/login']);
    return false;

  }

  isTokenExpirado():boolean{
    let token = this.authService.token;
    if(token != null){
      let payload = this.authService.getDataToken(token);
      let now  = new Date().getTime() /1000;
      if(payload.exp < now){
        return true;
      }

    }

    return false;
  }
}
