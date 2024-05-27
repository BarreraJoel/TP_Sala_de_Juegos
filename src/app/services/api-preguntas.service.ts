import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Pregunta } from '../models/pregunta';

@Injectable({
  providedIn: 'root'
})
export class ApiPreguntasService {

  private _http: HttpClient = inject(HttpClient);
  private path = "https://api.mockfly.dev/mocks/ff4e5cb1-a955-48e1-a5fd-d1cff7b7c654/questions";
  public preguntas: Pregunta[] = [];

  public async getPreguntas() {
    await this._http.get<Pregunta[]>(this.path).forEach(
      (preguntas: Pregunta[]) => {
        this.preguntas = preguntas;
      }
    );
  }

}
