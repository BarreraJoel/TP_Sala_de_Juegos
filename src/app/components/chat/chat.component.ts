import { Component, inject } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario';
import { MensajesService } from '../../services/mensajes.service';
import { Mensaje } from '../../models/mensaje';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AuthUsuarioService } from '../../services/auth-usuario.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe
  ],
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

  async cargarDatos() {

    this._usuarios.getUsuarios().subscribe(
      (response: Usuario[]) => {
        this.usuarios = response;
      },
      (error) => {
        console.log(error);
      }
    );

    this._mensajes.getMensajes()?.subscribe(
      (response: Mensaje[]) => {
        this.mensajes = response;
      },
      (error) => {
        console.log(error);
      }
    );

    this._auth.verficiarUsuario().subscribe(
      (response) => {

        console.log(response);
        if (response?.email)
          this.usuario = this._usuarios.getUsuario(response?.email);
          console.log(this.usuario);
      },
      (error) => {
        console.log(error);
      }
    );

  }

  enviarMensaje() {
    const fecha_hora_actual = new Date().toLocaleString();

    if (this.usuario)
      // this._mensajes.agregarMensaje({
      //   email_emisor: this.usuario.email,
      //   contenido: this.contenido,
      //   fecha_hora: fecha_hora_actual
      // });
      console.log(this.usuario);
  }

}
