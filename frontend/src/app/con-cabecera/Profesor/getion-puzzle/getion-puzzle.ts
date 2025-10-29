import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Categoria } from '../../../interface/categoria';
import { CategoriaService } from '../../../service/categoria.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
  selector: 'app-getion-puzzle',
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    ConfirmPopupModule
  ],
  providers: [ConfirmationService],
  templateUrl: './getion-puzzle.html',
  styleUrl: './getion-puzzle.css'
})
export class GetionPuzzleComponent {

  categorias: Categoria[] = []
  dialogEditarVisible = false
  categoriaAEditar: Categoria | null = null
  categoria!: Categoria

  constructor(
    private categoriaService: CategoriaService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoriaService.getCategorias().subscribe({
      next: (data: Categoria[]) => {
        this.categorias = data;
        console.log(data)
      },
      error: (err) => {
        console.error('Error al cargar los categorias:', err);
      }
    });
  }

  deleteCategorias(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as HTMLElement,
      message: '¿Seguro que quieres eliminar esta categoria?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        this.categoriaService.deleteCategoria(id).subscribe(() => {
          this.cargarCategorias();
        });
      }
    });
  }

  //Abrir, cerrar el modal y guardar la edicion

  abrirEditarCategoria(categoria: Categoria) {
    this.categoriaAEditar = categoria
    this.dialogEditarVisible = true
  }

  //Tengo que poner aqui tambien añadirle los objetos para resolverlo y un boton de prueba
}
