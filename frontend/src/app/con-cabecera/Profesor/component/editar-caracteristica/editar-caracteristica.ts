import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Caracteristica } from '../../../../interface/caracteristica';

@Component({
  selector: 'app-editar-caracteristica',
  imports: [
    DialogModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './editar-caracteristica.html',
  styleUrl: './editar-caracteristica.css'
})
export class EditarCaracteristica {
  @Input() visible: boolean = false;
  @Input() caracteristica: Caracteristica | null = null;

  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<Caracteristica>();

  nombre: string = ''

  ngOnChanges() {
    if (this.caracteristica) {
      this.nombre = this.caracteristica.nombre;
    }
  }

  handleClose() {
    this.onClose.emit();
  }

  save() {
    if (!this.caracteristica) return;

    const updated: Caracteristica = {
      ...this.caracteristica,
      nombre: this.nombre
    };

    this.onSave.emit(updated);
  }
}
