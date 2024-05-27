import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'juego',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './juego.component.html',
  styleUrl: './juego.component.css'
})
export class JuegoComponent {

  @Input() titulo: string = "";
  @Output() mostrarReglas: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() mostrarEstadisticas: EventEmitter<boolean> = new EventEmitter<boolean>();

  mostrarModalEstadisticas($event: boolean): void {
    this.mostrarEstadisticas.emit($event);
  }

  mostrarModalReglas($event: boolean): void {
    this.mostrarReglas.emit($event);
  }

}