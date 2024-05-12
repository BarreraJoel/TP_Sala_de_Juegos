import { Injectable, inject } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, authState } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthUsuarioService {

  private auth: Auth = inject(Auth);
  protected estaLogueado: boolean = false;

  async registrar(usuario: Usuario) {
    return await createUserWithEmailAndPassword(this.auth, usuario.email, usuario.password);
  }

  async login(usuario: Usuario) {
    return await signInWithEmailAndPassword(this.auth, usuario.email, usuario.password);
  }

  logout() {
    this.estaLogueado = false;
    return signOut(this.auth);
  }

  verficiarUsuario() {
    return authState(this.auth);
  }

}