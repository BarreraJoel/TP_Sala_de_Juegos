import { Component, inject } from '@angular/core';
import { JuegoComponent } from '../../../shared/components/juego/juego.component';
import { PreguntadosService } from '../../../services/preguntados.service';
import { ApiService } from '../../../services/api.service';
import { Pregunta } from '../../../models/pregunta';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [JuegoComponent],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent {
  // private _preguntados: PreguntadosService = inject(PreguntadosService);
  private _api: ApiService = inject(ApiService);
  protected preguntas: Pregunta[] = [];
  protected preguntaActual?: Pregunta;
  protected vidas: number = 3;
  protected aciertos: number = 0;
  protected acierta: boolean = false;

  constructor() {

    this._api.getPreguntas().subscribe(
      (response: Pregunta[]) => {
        console.log(response);
        this.preguntas = response;
        this.elegirPregunta();
      },
      (error) => {
        console.log(error);
      }
    );

  }

  private elegirPregunta() {
    const random = Math.floor(Math.random() * this.preguntas.length);
    this.preguntaActual = this.preguntas[random];
  }

}