import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Categoria } from '../../../../interface/categoria';
import { CategoriaService } from '../../../../service/categoria.service';

@Component({
  selector: 'app-test-puzzle',
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './test-puzzle.html',
  styleUrl: './test-puzzle.css'
})
export class TestPuzzle implements OnInit, OnChanges {
  @Input() visible: boolean = false;
  @Input() categoria: Categoria | null = null;

  @Output() onClose = new EventEmitter<void>();

  mensaje: string = '';
  cargando: boolean = false;
  error: string = '';

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.cargarMensaje();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['visible'] && changes['visible'].currentValue && this.categoria) {
      this.cargarMensaje();
    }
  }

  cargarMensaje() {
    if (!this.categoria || !this.categoria.id) {
      this.error = 'No hay categoría seleccionada';
      return;
    }

    this.cargando = true;
    this.error = '';
    this.mensaje = '';

    this.categoriaService.comprobarFuncional(this.categoria.id).subscribe({
      next: (data: any) => {
        console.log('Respuesta:', data.body.message);
        this.mensaje = data.body.message;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error:', err);
        this.error = err.error?.message || 'Error al verificar la categoría';
        this.cargando = false;
      }
    });
  }

  cerrar() {
    this.onClose.emit();
    this.mensaje = '';
    this.error = '';
  }
}