import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Categoria } from '../../../../interface/categoria';

@Component({
  selector: 'app-crear-categoria',
  imports: [
    DialogModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './crear-categoria.html',
  styleUrls: ['./crear-categoria.css']
})
export class CrearCategoriaComponent {
  @Input() visible: boolean = false;
  @Output() onClose = new EventEmitter<void>();

  @Output() onSave = new EventEmitter<Partial<Categoria>>();

  nombre: string = '';

  handleClose() {
    this.nombre = '';
    this.onClose.emit();
  }

save() {
  if (!this.nombre || this.nombre.trim() === '') return;

  const userStr = sessionStorage.getItem('user');
  let idCreador = null;

  if (userStr) {
    const userParsed = JSON.parse(userStr);
    idCreador = userParsed.user.id;
  }

  const nuevo: Partial<Categoria> = {
    nombre: this.nombre.trim(),
    idPuzzle: 1,
    idCreador: idCreador
  };

  this.onSave.emit(nuevo);

  this.nombre = '';
  this.onClose.emit();
}
}
