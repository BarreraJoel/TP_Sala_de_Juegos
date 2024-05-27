import { Component, inject } from '@angular/core';
import { JuegoComponent } from '../../../shared/components/juego/juego.component';
import { NgStyle } from '@angular/common';
import { User } from '@angular/fire/auth';
import { AuthUsuarioService } from '../../../services/auth-usuario.service';
import { PartidasService } from '../../../services/partidas.service';
import { Partida } from '../../../models/partida';

@Component({
  selector: 'app-juego-reaccion',
  standalone: true,
  imports: [
    JuegoComponent,
    NgStyle
  ],
  templateUrl: './juego-reaccion.component.html',
  styleUrl: './juego-reaccion.component.css'
})
export class JuegoReaccionComponent {

  private _auth: AuthUsuarioService = inject(AuthUsuarioService);
  private _partidas: PartidasService = inject(PartidasService);
  protected grilla = [];
  protected partidas: Partida[] = [];
  protected vidas: number = 3;
  protected aciertos: number = 0;
  protected indiceCuadro: number = -1;
  protected intervalos: number[] = [1000, 1500, 2000];
  protected timer: any;
  protected timerTemp: any;
  protected temporizador: Date = new Date();
  protected empezo: boolean = false;
  protected termino: boolean = false;
  protected reglas: boolean = false;
  protected estadisticas: boolean = false;
  private usuario: User | null = null;

  constructor() {
    this._partidas.getPartidas("juego-de-reaccion")?.subscribe(
      (response: Partida[]) => { this.partidas = response; },
      (error) => { console.log(error); }
    );
  }

  async ngOnInit() {
    this.usuario = this._auth.usuarioLogueado;
  }

  protected iniciar() {
    this.vidas = 3;
    this.empezo = true;
    this.aciertos = 0;
    this.termino = false;
    this.temporizador.setHours(0);
    this.temporizador.setMinutes(0);
    this.temporizador.setSeconds(30);
    this.cargarGrilla();
    this.jugar();
  }

  private jugar() {
    this.timer = setInterval(() => {
      this.temporizador.setSeconds(this.temporizador.getSeconds() - 1);
    }, 1000);

    this.timerTemp = setInterval(() => {
      this.elegirCuadroAleatorio();
      if (this.vidas == 0) {
        this.terminarPartida();
      }
    }, this.intervalos[Math.floor(Math.random() * this.intervalos.length)]);

    setTimeout(() => {
      this.terminarPartida();
    }, this.temporizador.getSeconds() * 1000);
  }

  private pararTimer(timer: any) {
    clearInterval(timer);
  }

  private cargarGrilla() {
    this.grilla.length = 9;
  }

  protected verificarCuadro(index: number) {
    if (this.indiceCuadro == index) {
      this.aciertos++;
    }
    else {
      this.vidas--;
    }
  }

  private terminarPartida() {
    if (this.usuario?.email && this.aciertos > 0) {
      this._partidas.agregarPartida({
        usuario: this.usuario.email,
        aciertos: this.aciertos
      }, "juego-de-reaccion");
    }
    this.pararTimer(this.timer);
    this.pararTimer(this.timerTemp);
    this.termino = true;
    this.empezo = false;
    this.indiceCuadro = -1;
  }

  private elegirCuadroAleatorio() {
    this.indiceCuadro = Math.floor(Math.random() * this.grilla.length);
  }

  cambiarEstadisticas(value: boolean): void {
    this.estadisticas = value;
  }

  cambiarReglas(value: boolean): void {
    this.reglas = value;
  }

}
