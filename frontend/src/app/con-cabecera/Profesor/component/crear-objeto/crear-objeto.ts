import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Objeto } from '../../../../interface/objeto';

@Component({
  selector: 'app-crear-objeto',
  standalone: true,
  imports: [
    DialogModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './crear-objeto.html',
  styleUrls: ['./crear-objeto.css']
})
export class CrearObjetoComponent {
  @Input() visible: boolean = false;
  @Input() idCategoria?: number;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<Partial<Objeto>>();

  nombre: string = '';

  handleClose() {
    this.nombre = '';
    this.onClose.emit();
  }

  save() {
    if (!this.nombre || this.nombre.trim() === '') return;

    const nuevo: Partial<Objeto> = {
      nombre: this.nombre.trim()
    };

    if (this.idCategoria != null) {
      nuevo.idCategoria = this.idCategoria;
    }

    this.onSave.emit(nuevo);

    this.nombre = '';
    this.onClose.emit();
  }
}
