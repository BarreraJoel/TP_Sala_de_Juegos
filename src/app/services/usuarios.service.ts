import { Injectable, inject } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private path: string = "usuarios";
  private firestore: Firestore = inject(Firestore);
  public usuarios: Observable<Usuario[]>;

  constructor() {
    this.usuarios = collectionData(collection(this.firestore, this.path)) as Observable<Usuario[]>;
  }

  agregarUsuario(usuario: Usuario) {
    const usuarios = collection(this.firestore, this.path);
    return addDoc(usuarios, usuario);
  }

  getUsuarios() {
    return this.usuarios;
  }

}