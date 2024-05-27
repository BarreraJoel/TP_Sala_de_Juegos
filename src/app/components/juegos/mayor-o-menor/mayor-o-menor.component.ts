import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PartidasService } from '../../../services/partidas.service';
import { AuthUsuarioService } from '../../../services/auth-usuario.service';
import { JuegoComponent } from '../../../shared/components/juego/juego.component';
import { User } from '@angular/fire/auth';
import { Partida } from '../../../models/partida';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-mayor-o-menor',
  standalone: true,
  imports: [
    RouterLink,
    JuegoComponent,
    NgStyle
  ],
  templateUrl: './mayor-o-menor.component.html',
  styleUrl: './mayor-o-menor.component.css'
})
export class MayorOMenorComponent implements OnInit {

  protected cartas: number[] = [];
  protected cartaTirada: number = 0;
  protected vidas: number = 5;
  protected finalizado: boolean = false;
  protected acertado?: boolean;
  protected pierde: boolean = false;
  protected partidas: Partida[] = [];
  private usuario: User | null = null;
  protected aciertos: number = 0;
  protected estadisticas: boolean = false;
  protected reglas: boolean = false;

  constructor(private _mayorMenor: PartidasService, private _auth: AuthUsuarioService) {
    this._mayorMenor.getPartidas("mayor-menor")?.subscribe(
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
    this.pierde = false;
    this.cartaTirada = 0;
    this.vidas = 5;
    this.aciertos = 0;
    this.cartas = [];
    this.cargarMazo();
    this.mezclarCartas();
    let carta = this.cartas.pop();
    if (carta)
      this.cartaTirada = carta;
  }

  private cargarMazo() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 12; j++) {
        this.cartas.push(j + 1);
      }
    }
  }

  private mezclarCartas() {
    let cartaAux: number = 0;
    let random: number = 0;

    for (let j = 0; j < this.cartas.length; j++) {
      random = Math.floor(Math.random() * 12);
      cartaAux = this.cartas[j];
      this.cartas[j] = this.cartas[random];
      this.cartas[random] = cartaAux;
    }
  }

  private compararCarta(condicion: string): boolean {
    let respuesta: boolean = false;
    let carta = this.cartas.pop();

    if (carta) {
      switch (condicion) {
        case "MAYOR":
          respuesta = carta > this.cartaTirada;
          break;
        case "MENOR":
          respuesta = carta < this.cartaTirada;
          break;
      }
      this.cartaTirada = carta;
    }

    return respuesta;
  }

  protected jugarCarta(condicion: string) {

    if (this.acertado = this.compararCarta(condicion)) {
      this.aciertos++;
      setTimeout(() => {
      }, 1000);
    }
    else {
      this.vidas--;
    }

    this.pierde = this.vidas == 0;

    if (this.pierde && this.aciertos > 0) {
      if (this.usuario?.email) {
        this._mayorMenor.agregarPartida({
          usuario: this.usuario.email,
          aciertos: this.aciertos
        }, "mayor-menor");
      }
      this.aciertos = 0;
    }
  }

  protected terminarPartida() {
    if (this.aciertos > 0) {
      if (this.usuario?.email) {
        this._mayorMenor.agregarPartida({
          usuario: this.usuario.email,
          aciertos: this.aciertos
        }, "mayor-menor");
      }
      this.iniciarDatos();
    }
  }

  cambiarEstadisticas(value: boolean): void {
    this.estadisticas = value;
  }

  cambiarReglas(value: boolean): void {
    this.reglas = value;
  }

}
