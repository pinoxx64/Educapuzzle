import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Categoria } from '../../../../interface/categoria';

@Component({
  selector: 'app-editar-categoria',
  imports: [
    DialogModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './editar-categoria.html',
  styleUrls: ['./editar-categoria.css']
})
export class EditarCategoriaComponent {
  @Input() visible: boolean = false;
  @Input() categoria: Categoria | null = null;

  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<Categoria>();

  nombre: string = '';

  ngOnChanges() {
    if (this.categoria) {
      this.nombre = this.categoria.nombre;
    }
  }

  handleClose() {
    this.onClose.emit();
  }

  save() {
    if (!this.categoria) return;

    const updated: Categoria = {
      ...this.categoria,
      nombre: this.nombre
    };

    this.onSave.emit(updated);
  }
}
