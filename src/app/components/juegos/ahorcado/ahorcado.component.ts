import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PartidasService } from '../../../services/partidas.service';
import { AuthUsuarioService } from '../../../services/auth-usuario.service';
import { NgStyle } from '@angular/common';
import { JuegoComponent } from '../../../shared/components/juego/juego.component';
import { User } from '@angular/fire/auth';
import { Partida } from '../../../models/partida';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [
    RouterLink,
    JuegoComponent,
    NgStyle
  ],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent implements OnInit {

  protected letras: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  private path: string = "../../../../assets/img/juegos/ahorcado/";
  protected url_imagen: string = "";
  private palabras: string[] = ["OLA", "MUNDO", "MEDICINA", "ROJO", "PLAYA", "MESA", "FUTBOL"];
  protected palabraEnJuego: string = "";
  protected palabraElegida: string = "";
  private fase: number = 0;
  protected vidas: number = 6;
  private letrasUsadas: string[] = [];
  protected finalizado: boolean = false;
  protected acertado: boolean = false;
  protected pierde: boolean = false;
  protected partidas: Partida[] = [];
  protected aciertos: number = 0;
  private usuario: User | null = null;
  protected reglas: boolean = false;
  protected estadisticas: boolean = false;

  constructor(private _ahorcado: PartidasService, private _auth: AuthUsuarioService) {
    this._ahorcado.getPartidas("ahorcado")?.subscribe(
      (response: Partida[]) => { this.partidas = response; },
      (error) => { console.log(error); }
    );
  }

  async ngOnInit() {
    this.usuario = this._auth.usuarioLogueado;
    this.iniciarDatos();
  }

  protected iniciarDatos() {
    this.finalizado = false;
    this.acertado = false;
    this.pierde = false;
    this.letrasUsadas = [];
    this.palabraEnJuego = "";
    this.fase = 0;
    this.vidas = 6;
    this.url_imagen = `${this.path}fase_0${this.fase}.jpg`;
    this.palabraElegida = this.palabras[Math.floor(Math.random() * this.palabras.length)];
    this.generarPalabra();
  }

  private generarPalabra(letra?: string) {

    if (letra) {
      this.palabraEnJuego = this.formarPalabraParcial(letra);
    }
    else {
      for (let letra = 0; letra < this.palabraElegida.length; letra++) {
        this.palabraEnJuego += letra == this.palabraElegida.length - 1 ? "_" : "_ ";
      }
    }
  }

  private formarPalabraParcial(letra: string) {
    let palabraAux: string = "";
    let palabraEnJuegoAux: string[] = this.palabraEnJuego.split(" ");

    for (let index = 0; index < palabraEnJuegoAux.length; index++) {

      if (this.palabraElegida[index] == letra) {
        palabraAux += index == this.palabraElegida.length - 1 ? letra : `${letra} `;
      }
      else if (palabraEnJuegoAux[index] == this.palabraElegida[index]) {
        palabraAux += index == this.palabraElegida.length - 1 ? palabraEnJuegoAux[index] : `${palabraEnJuegoAux[index]} `;
      }
      else {
        palabraAux += index == this.palabraElegida.length - 1 ? "_" : "_ ";
      }
    }

    return palabraAux;
  }

  protected jugarLetra(letra: string) {

    this.letrasUsadas.push(letra);
    if (this.palabraElegida.includes(letra)) {
      this.generarPalabra(letra);
    }
    else {
      this.vidas--;
      this.fase++;
      this.url_imagen = `${this.path}fase_0${this.fase}.jpg`;
    }
    this.pierde = this.vidas == 0;
    this.acertado = (this.palabraEnJuego.split(" ").toString() == this.palabraElegida.split("").toString());
    if (this.acertado) {
      this.aciertos++;
      setTimeout(() => {
        this.iniciarDatos();
      }, 1000);
    }
    if (this.pierde) {
      if (this.aciertos > 0 && this.usuario?.email) {
        this._ahorcado.agregarPartida({
          usuario: this.usuario.email,
          aciertos: this.aciertos
        }, "ahorcado");
      }
    }
  }

  protected verificarLetra(letra: string): boolean {
    return this.letrasUsadas.includes(letra);
  }

  protected terminarPartida() {
    if (this.aciertos > 0) {
      if (this.aciertos > 0 && this.usuario?.email) {
        this.finalizado = true;
        this._ahorcado.agregarPartida({
          usuario: this.usuario?.email,
          aciertos: this.aciertos
        }, "ahorcado");
        setTimeout(() => {
          this.iniciarDatos();
          this.aciertos = 0;
        }, 1000);
      }
    }
  }

  cambiarEstadisticas(value: boolean): void {
    this.estadisticas = value;
  }

  cambiarReglas(value: boolean): void {
    this.reglas = value;
  }

}
