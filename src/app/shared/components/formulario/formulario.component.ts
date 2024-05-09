import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
  ],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

  @Input() email: string = "";
  @Input() password: string = "";
  @Input() textoBoton: string = "";
  @Input() textoTitulo: string = "";
  @Output() enviar = new EventEmitter<Usuario>();

  enviarUsuario(){
    this.enviar.emit({
      email: this.email,
      password: this.password
    });
  }
  
}
