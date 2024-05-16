import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/Usuario';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  loading?: boolean;
  titulo: string = 'Iniciar Sesión';
  usuario: Usuario = new Usuario();

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      Swal.fire(
        'Login',
        'Hola ' +
          this.authService.usuario.username +
          ' ' +
          'ya estas autenticado!',
        'info'
      );
      this.router.navigate(['/dashboard']);
    }
  }

  loginUser() {

    this.authService.login(this.usuario).subscribe({
      next: (response) => {
        console.log('response service login  :>> ', response);
        this.authService.saveUserStorage(response.access_token);
        this.authService.saveToken(response.access_token);
        let user = this.authService.usuario;
        this.fakeLoading();
        Swal.fire('Login','Hola: ' + user.username + 'Has iniciado sesion con exito!','success');

      },
      error: (err) => {
        console.log('error service login  :>> ', err);
        if (err.status == 400) {
          this.error();
          this.form?.reset();
        }
      },
    });
  }

  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 1500);
  }

  error(){
    this.snackBar.open('Usuario o contraseña ingresado son invalidos','',{
      duration : 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }
}
