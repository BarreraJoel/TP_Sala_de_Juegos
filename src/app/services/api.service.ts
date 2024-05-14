import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Pregunta } from '../models/pregunta';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _http: HttpClient = inject(HttpClient);
  private path = "https://apimocha.com/quick-questions/questions";

  getPreguntas() : Observable<Pregunta[]>{
    return this._http.get(this.path) as Observable<Pregunta[]>;
  }

}
