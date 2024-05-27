import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, orderBy, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Partida } from '../models/partida';

@Injectable({
  providedIn: 'root'
})
export class PartidasService {

  private firestore: Firestore = inject(Firestore);
  private partidasAhorcado: Observable<Partida[]>;
  private partidasMayorMenor: Observable<Partida[]>;
  private partidasPreguntados: Observable<Partida[]>;
  private partidasJuegoReaccion: Observable<Partida[]>;

  constructor() {
    this.partidasAhorcado = collectionData(query(collection(this.firestore, "ahorcado"), orderBy("aciertos", "desc"))) as Observable<Partida[]>;
    this.partidasMayorMenor = collectionData(query(collection(this.firestore, "mayor-menor"), orderBy("aciertos", "desc"))) as Observable<Partida[]>;
    this.partidasPreguntados = collectionData(query(collection(this.firestore, "preguntados"), orderBy("aciertos", "desc"))) as Observable<Partida[]>;
    this.partidasJuegoReaccion = collectionData(query(collection(this.firestore, "juego-de-reaccion"), orderBy("aciertos", "desc"))) as Observable<Partida[]>;
  }

  agregarPartida(partida: Partida, tipo: string) {
    const partidas = collection(this.firestore, tipo);
    return addDoc(partidas, partida);
  }

  getPartidas(tipo: string): Observable<any> | null {
    let partidas;

    switch (tipo) {
      case "ahorcado":
        partidas = this.partidasAhorcado;
        break;
      case "mayor-menor":
        partidas = this.partidasMayorMenor;
        break;
      case "preguntados":
        partidas = this.partidasPreguntados;
        break;
      case "juego-de-reaccion":
        partidas = this.partidasJuegoReaccion;
        break;
      default:
        partidas = null;
        break;
    }

    return partidas;
  }
}
