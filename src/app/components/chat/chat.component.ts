import { Component, inject } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario';
import { MensajesService } from '../../services/mensajes.service';
import { Mensaje } from '../../models/mensaje';
import { FormsModule } from '@angular/forms';
import { AuthUsuarioService } from '../../services/auth-usuario.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  private _usuarios: UsuariosService = inject(UsuariosService);
  private _mensajes: MensajesService = inject(MensajesService);
  private _auth: AuthUsuarioService = inject(AuthUsuarioService);
  protected usuarios: Usuario[] = [];
  protected mensajes: Mensaje[] = [];
  protected contenido: string = "";
  protected usuario?: Usuario;

  constructor() {
    this.cargarDatos();
  }

  cargarDatos() {
    this._usuarios.getUsuarios().subscribe(
      (response: Usuario[]) => {
        this.usuarios = response;

        this._auth.verficiarUsuario().subscribe(
          (next) => {
            if (next?.email) {
              this._usuarios.getUsuario(next?.email)
                .then((response: Usuario) => {
                  this.usuario = response;
                })
            }
          })
      },
      (error) => {
        console.log(error);
      });

    this._mensajes.getMensajes()?.subscribe(
      (response: Mensaje[]) => {
        this.mensajes = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  enviarMensaje() {
    if (this.contenido.length > 0) {
      const fecha = new Date().toLocaleDateString();
      const hora = new Date().toLocaleTimeString();

      if (this.usuario) {
        this._mensajes.agregarMensaje({
          email_emisor: this.usuario.email,
          contenido: this.contenido,
          fecha: fecha,
          hora: hora
        });
      }
      this.contenido = "";
    }
  }

}
