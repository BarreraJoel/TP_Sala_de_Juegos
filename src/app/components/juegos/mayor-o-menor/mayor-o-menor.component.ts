import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MayorMenor } from '../../../models/mayor-menor';
import { PartidasService } from '../../../services/partidas.service';
import { AuthUsuarioService } from '../../../services/auth-usuario.service';

@Component({
  selector: 'app-mayor-o-menor',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './mayor-o-menor.component.html',
  styleUrl: './mayor-o-menor.component.css'
})
export class MayorOMenorComponent {

  protected cartas: number[] = [];
  protected cartaTirada: number = 0;
  protected vidas: number = 5;
  protected finalizado: boolean = false;
  protected acertado?: boolean;
  protected pierde: boolean = false;
  protected partidas: MayorMenor[] = [];
  private email: string = "";
  protected aciertos: number = 0;
  protected mostrar: boolean = false;
  protected reglas: boolean = false;

  constructor(private _mayorMenor: PartidasService, private _auth: AuthUsuarioService) {
    this._auth.verficiarUsuario().subscribe(
      (response) => {
        if (response?.email)
          this.email = response?.email;
      },
      (error) => {
        console.log(error);
      }
    );

    this._mayorMenor.getPartidasMayorMenor().subscribe(
      (response: MayorMenor[]) => {
        this.partidas = response;
      },
      (error) => {
        console.log(error);
      }
    );
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
      this._mayorMenor.agregarPartidaMayorMenor({
        usuario: this.email,
        cartas_acertadas: this.aciertos
      });
      this.aciertos = 0;
    }
  }

  protected terminarPartida() {
    if (this.aciertos > 0) {
      this._mayorMenor.agregarPartidaMayorMenor({
        usuario: this.email,
        cartas_acertadas: this.aciertos
      });
      this.iniciarDatos();
    }
  }

}
