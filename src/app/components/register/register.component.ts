import { Component, inject } from '@angular/core';
import { FormularioComponent } from '../../shared/components/formulario/formulario.component';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuariosService } from '../../services/usuarios.service';
import { AuthUsuarioService } from '../../services/auth-usuario.service';
import { FirebaseError } from '@angular/fire/app';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    FormularioComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private _authUsuario: AuthUsuarioService = inject(AuthUsuarioService);
  private _usuario: UsuariosService = inject(UsuariosService);
  private router: Router = inject(Router);
  protected texto: string = "";
  protected mostrar: boolean = false;

  registrar(usuario: Usuario) {
    this.texto = "";
    if (usuario.email == "" || usuario.password == "") {
      this.texto = "Debe ingresar email y contraseña";
    }
    else {
      this._authUsuario.registrar(usuario)
        .then((response) => {
          this._usuario.agregarUsuario(usuario)
            .then((response) => {
              this.texto = "Usuario registrado con éxito. Redirigiendo al home...";
              setTimeout(() => {
                this.router.navigateByUrl("/home");
              }, 2000);
            })
        })
        .catch((error: FirebaseError) => {
          switch (error.code) {
            case "auth/email-already-in-use":
              this.texto = "El email ingresado pertenece a otro usuario";
              break;
            case "auth/invalid-email":
              this.texto = "El email ingresado no tiene un formato válido";
              break;
            case "auth/weak-password":
              this.texto = "La contraseña ingresada no es válida. Debe contener al menos 6 caracteres";
              break;
            default:
              this.texto = error.message;
              break;
          }
        });
    }
    this.mostrar = true;
  }

}