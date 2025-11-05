import { Component, Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Caracteristica } from '../../../../interface/caracteristica';

@Component({
  selector: 'app-crear-caracteristica',
  imports: [
    DialogModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './crear-caracteristica.html',
  styleUrl: './crear-caracteristica.css'
})
export class CrearCaracteristicaComponent {
  @Input() visible: boolean = false;
  @Input() caracteristica: Caracteristica | null = null;
  @Input() onClose: () => void = () => {};
  @Input() onSave: (caracteristica: Partial<Caracteristica>) => void = () => {};

  nombre: string = ''

  save() {
    if (this.caracteristica) {
      this.onSave({
        id: this.caracteristica.id,
        nombre: this.nombre
      });
    }
  }
}
