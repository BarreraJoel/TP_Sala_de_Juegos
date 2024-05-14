import { Injectable, inject } from '@angular/core';
import { Mensaje } from '../models/mensaje';
import { Firestore, collection, collectionData, addDoc, query, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  private path: string = "mensajes";
  private firestore: Firestore = inject(Firestore);
  private mensajes?: Observable<Mensaje[]>;

  constructor() {
    this.mensajes = collectionData(query(collection(this.firestore, this.path), orderBy("fecha", "asc"))) as Observable<Mensaje[]>;
  }

  agregarMensaje(mensaje: Mensaje) {
    const mensajes = collection(this.firestore, this.path);
    return addDoc(mensajes, mensaje);
  }

  getMensajes() {
    return this.mensajes;
  }
  
}