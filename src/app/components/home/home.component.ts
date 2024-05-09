import { Component, inject } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AuthUsuarioService } from '../../services/auth-usuario.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  protected usuario?: User;
  private _auth: AuthUsuarioService = inject(AuthUsuarioService);

  constructor() {
    this._auth.verficiarUsuario().subscribe(
      (response) => {
        if (response) {
          this.usuario = response;
        }
      },
      (error) => {
        
      });
  }

}
