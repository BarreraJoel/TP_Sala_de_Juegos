import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthUsuarioService } from './services/auth-usuario.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private _auth: AuthUsuarioService = inject(AuthUsuarioService);
  private router: Router = inject(Router);
  protected estaLogueado: boolean = false;

  constructor() {
    this._auth.verficiarUsuario().subscribe(
      (response) => {
        this.estaLogueado = response != null;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  logout() {
    this._auth.logout()
      .then((response) => {
        this.router.navigateByUrl("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
