import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
})
export class EstadisticasComponent {
  @Input() mostrar: boolean = false;
  
}
