import { Component, OnInit, inject } from '@angular/core';
import { JuegoComponent } from '../../../shared/components/juego/juego.component';
import { ApiPreguntasService } from '../../../services/api-preguntas.service';
import { Pregunta } from '../../../models/pregunta';
import { NgStyle } from '@angular/common';
import { PartidasService } from '../../../services/partidas.service';
import { AuthUsuarioService } from '../../../services/auth-usuario.service';
import { User } from '@angular/fire/auth';
import { Partida } from '../../../models/partida';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [
    JuegoComponent,
    NgStyle
  ],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent implements OnInit {
  private _auth: AuthUsuarioService = inject(AuthUsuarioService);
  private _apiPreguntas: ApiPreguntasService = inject(ApiPreguntasService);
  private _preguntados: PartidasService = inject(PartidasService);
  protected partidas: Partida[] = [];
  protected preguntas: Pregunta[] = [];
  protected preguntasActuales: Pregunta[] = [];
  protected preguntaActual?: Pregunta;
  protected vidas: number = 3;
  protected aciertos: number = 0;
  protected acierta?: boolean;
  protected gano?: boolean;
  protected perdio: boolean = false;
  protected yaJugo: boolean = false;
  private usuario: User | null = null;
  protected reglas: boolean = false;
  protected estadisticas: boolean = false;

  constructor() {
    this._preguntados.getPartidas("preguntados")?.subscribe(
      (response: Partida[]) => { this.partidas = response; },
      (error) => { console.log(error); }
    );
  }

  async ngOnInit() {
    this.usuario = this._auth.usuarioLogueado;

    await this._apiPreguntas.getPreguntas();
    this.preguntas = this._apiPreguntas.preguntas;
    this.iniciar();
  }

  private elegirPregunta() {
    this.preguntaActual = this.preguntasActuales.pop();
  }

  protected verificarOpcion(respuesta: string): boolean {
    return this.preguntaActual?.correct_answer == respuesta;
  }

  private async mezclarPreguntas() {
    let aux: Pregunta;
    let listaAux: Pregunta[] = this.preguntas.slice();

    for (let index = 0; index < this.preguntas.length; index++) {
      let random = Math.floor(Math.random() * this.preguntas.length);
      aux = listaAux[index];
      listaAux[index] = listaAux[random];
      listaAux[random] = aux;
    }
    this.preguntasActuales = listaAux.slice();
  }

  protected async iniciar() {
    this.aciertos = 0;
    this.vidas = 3;
    this.acierta = false;
    this.perdio = false;
    this.gano = false;
    await this.mezclarPreguntas();
    this.elegirPregunta();
  }

  protected jugarOpcion(respuesta: string) {
    this.yaJugo = true;

    if (this.acierta = this.verificarOpcion(respuesta)) {
      this.aciertos++;
    }
    else {
      this.vidas--;
    }

    setTimeout(() => {
      if ((this.gano = this.aciertos == this.preguntas.length) || (this.perdio = this.vidas == 0)) {
        this.terminarPartida();
      }
      else {
        this.elegirPregunta();
      }
      this.yaJugo = false;
    }, 1500);
  }

  terminarPartida() {
    if (this.aciertos > 0) {
      if (this.usuario?.email) {
        this._preguntados.agregarPartida({
          usuario: this.usuario?.email,
          aciertos: this.aciertos
        }, "preguntados");
      }
    }
    this.perdio = true;
  }

  cambiarEstadisticas(value: boolean): void {
    this.estadisticas = value;
  }

  cambiarReglas(value: boolean): void {
    this.reglas = value;
  }

}