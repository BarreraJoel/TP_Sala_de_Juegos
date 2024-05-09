import { Component, OnInit, inject } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { Router, RouterLink } from '@angular/router';
import { FormularioComponent } from '../../shared/components/formulario/formulario.component';
import { UsuariosService } from '../../services/usuarios.service';
import { AuthUsuarioService } from '../../services/auth-usuario.service';
import { FirebaseError } from '@angular/fire/app';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormularioComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  private _authUser: AuthUsuarioService = inject(AuthUsuarioService);
  private _usuario: UsuariosService = inject(UsuariosService);
  private router: Router = inject(Router);
  protected mostrar?: boolean;
  protected texto: string = "";
  protected usuarios: Usuario[] = [];
  protected email: string = "";
  protected password: string = "";

  ngOnInit() {
    this._usuario.getUsuarios().subscribe(
      (next: Usuario[]) => {
        this.usuarios = next;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loguear(usuario: Usuario) {
    this.texto = "";

    if (usuario.email == "" || usuario.password == "") {
      this.texto = "Debe ingresar email y contraseña";
    }
    else {
    this._authUser.login(usuario)
      .then((response) => {
        this.texto = "Usuario logueado con éxito. Redirigiendo al home...";
        this.mostrar = true;
        setTimeout(() => {
          this.router.navigateByUrl("/home");
        }, 2000);
      })
      .catch((error: FirebaseError) => {
        switch (error.code) {
          case "auth/invalid-email":
            this.texto = "El email ingresado no tiene un formato válido";
            break;
          case "auth/invalid-credential":
            this.texto = "Las credenciales ingresadas no coinciden con algún registro";
            break;
          default:
            this.texto = error.message;
            break;
        }
      });
    }
    this.mostrar = true;
  }

  completarUsuario() {
    const numero = Math.floor(Math.random() * this.usuarios.length);
    this.email = this.usuarios[numero].email;
    this.password = this.usuarios[numero].password;
  }
}
