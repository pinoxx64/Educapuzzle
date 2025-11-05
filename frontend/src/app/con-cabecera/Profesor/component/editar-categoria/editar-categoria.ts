import { Component, Input } from '@angular/core';
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
  styleUrl: './editar-categoria.css'
})
export class EditarCategoriaComponent {
  @Input() visible: boolean = false;
  @Input() categoria: Categoria | null = null;
  @Input() onClose: () => void = () => {};
  @Input() onSave: (categoria: Partial<Categoria>) => void = () => {};

  nombre: string = ''

  ngOnChanges() {
      if (this.categoria) {
      console.log(this.categoria);
      this.nombre = this.categoria.nombre;
    }
  }

  save() {
    if (this.categoria) {
      this.onSave({
        id: this.categoria.id,
        nombre: this.nombre
      });
    }
  }
}
