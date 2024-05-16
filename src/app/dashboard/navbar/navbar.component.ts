import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menu:any[] = [];

  constructor(private menuService:MenuService,public authService:AuthService,private router:Router) { }
  ngOnInit(): void {
    this.cargarMenu();

  }

  logout() {
    Swal.fire(
      "Logout",
      `Hola ${this.authService.usuario.username}, has cerrado sesion con exito!`,
      "success"
    );
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

  cargarMenu(){
    this.menuService.getMenu().subscribe(data => {
      console.log(data);
      this.menu = data;
    })
  }

}
