import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/Usuario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _usuario?: Usuario | null;
  private _token: string | null = null;

  constructor(private http: HttpClient) {}

  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    } else if (
      this._usuario == null &&
      sessionStorage.getItem('usuario') != null
    ) {
      this._usuario = JSON.parse(
        sessionStorage.getItem('usuario') || '{}'
      ) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }
  public get token() {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token') || ''; // Assign an empty string if sessionStorage.getItem('token') returns null
      return this._token;
    }
    return null; // Add this line to return a value if none of the conditions are met
  }
  login(request: Usuario): Observable<any> {
    const urlEndpoint = 'http://localhost:8085/oauth/token';
    const credenciales = btoa('angularapp' + ':' + '12345');
    const httpHeaders = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + credenciales,
    };
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', request.username);
    params.set('password', request.password);
    console.log(params.toString());

    return this.http.post<any>(urlEndpoint, params.toString(), {
      headers: httpHeaders,
    });
  }
  saveUserStorage(accessToken: string): void {
    let payload = this.getDataToken(accessToken);
    this._usuario = new Usuario();
    this._usuario.nombres = payload.nombres;
    this._usuario.apellidos = payload.apellidos;
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;
    this._usuario.email = payload.email;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  getDataToken(accessToken: string) {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split('.')[1]));
    }
    return null;
  }
  saveToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  isAuthenticated(): boolean {
    //let payload = this.getDataToken(this._token);
    let payload = this._token ? this.getDataToken(this._token) : null;
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }
  hasRole(role: string): boolean {
    if (this.usuario.roles.includes(role)) {
      return true;
    }
    return false;
  }

  logout():void{
    this._token = null;
    this._usuario = null;
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }
}
