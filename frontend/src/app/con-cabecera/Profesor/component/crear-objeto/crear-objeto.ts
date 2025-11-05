import { Component, Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Objeto } from '../../../../interface/objeto';

@Component({
  selector: 'app-crear-objeto',
  imports: [
    DialogModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './crear-objeto.html',
  styleUrl: './crear-objeto.css'
})
export class CrearObjetoComponent {
  @Input() visible: boolean = false;
  @Input() objeto: Objeto | null = null;
  @Input() onClose: () => void = () => {};
  @Input() onSave: (objeto: Partial<Objeto>) => void = () => {};

  nombre: string = ''

  save() {
    if (this.objeto) {
      this.onSave({
        id: this.objeto.id,
        nombre: this.nombre
      });
    }
  }
}
