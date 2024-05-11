import { Component, inject } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AuthUsuarioService } from '../../services/auth-usuario.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private _auth: AuthUsuarioService = inject(AuthUsuarioService);
  protected usuario?: User;

  constructor() {
    this._auth.verficiarUsuario().subscribe(
      (response) => {
        if (response) {
          this.usuario = response;
        }
      },
      (error) => {
        console.log(error);
      });
  }
}
