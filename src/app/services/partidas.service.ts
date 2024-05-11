import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, orderBy, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Ahorcado } from '../models/ahorcado';
import { MayorMenor } from '../models/mayor-menor';

@Injectable({
  providedIn: 'root'
})
export class PartidasService {

  private pathAhorcado: string = "ahorcado";
  private pathMayorMenor: string = "mayor-menor";
  private firestore: Firestore = inject(Firestore);
  private partidasAhorcado: Observable<Ahorcado[]>;
  private partidasMayorMenor: Observable<MayorMenor[]>;

  constructor() {
    this.partidasAhorcado = collectionData(query(collection(this.firestore, this.pathAhorcado), orderBy("palabras_acertadas", "desc"))) as Observable<Ahorcado[]>;
    this.partidasMayorMenor = collectionData(collection(this.firestore, this.pathMayorMenor)) as Observable<MayorMenor[]>;
  }

  agregarPartidaAhorcado(partida: Ahorcado) {
    const partidasAhorcado = collection(this.firestore, this.pathAhorcado);
    return addDoc(partidasAhorcado, partida);
  }

  getPartidasAhorcado() {
    return this.partidasAhorcado;
  }

  agregarPartidaMayorMenor(partida: MayorMenor) {
    const partidasMayorMenor = collection(this.firestore, this.pathAhorcado);
    return addDoc(partidasMayorMenor, partida);
  }

  getPartidasMayorMenor() {
    return this.partidasMayorMenor;
  }

}
