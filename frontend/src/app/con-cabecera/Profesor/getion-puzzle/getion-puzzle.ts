import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Categoria } from '../../../interface/categoria';
import { CategoriaService } from '../../../service/categoria.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { EditarCategoriaComponent } from '../component/editar-categoria/editar-categoria';
import { CrearCategoria } from '../component/crear-categoria/crear-categoria';



@Component({
  selector: 'app-getion-puzzle',
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    ConfirmPopupModule,
    EditarCategoriaComponent,
    CrearCategoria
  ],
  providers: [ConfirmationService],
  templateUrl: './getion-puzzle.html',
  styleUrl: './getion-puzzle.css'
})
export class GetionPuzzleComponent {

  // categorias: Categoria[] = []
  // dialogEditarVisible = false
  // categoriaAEditar: Categoria | null = null
  // categoria!: Categoria

  // constructor(
  //   private categoriaService: CategoriaService,
  //   private confirmationService: ConfirmationService
  // ) { }

  // ngOnInit() {
  //   this.cargarCategorias();
  // }

  // cargarCategorias() {
  //   this.categoriaService.getCategorias().subscribe({
  //     next: (data: Categoria[]) => {
  //       this.categorias = data;
  //       console.log(data)
  //     },
  //     error: (err) => {
  //       console.error('Error al cargar los categorias:', err);
  //     }
  //   });
  // }

  // deleteCategorias(event: Event, id: number) {
  //   this.confirmationService.confirm({
  //     target: event.target as HTMLElement,
  //     message: '¿Seguro que quieres eliminar esta categoria?',
  //     icon: 'pi pi-exclamation-triangle',
  //     acceptLabel: 'Sí',
  //     rejectLabel: 'No',
  //     accept: () => {
  //       this.categoriaService.deleteCategoria(id).subscribe(() => {
  //         this.cargarCategorias();
  //       });
  //     }
  //   });
  // }

  // //Abrir, cerrar el modal y guardar la edicion

  // abrirEditarCategoria(categoria: Categoria) {
  //   this.categoriaAEditar = categoria
  //   this.dialogEditarVisible = true
  // }

  // //Tengo que poner aqui tambien añadirle los objetos para resolverlo y un boton de prueba
  
  categorias: Categoria[] = []
  dialogEditarVisible = false
  categoriaAEditar: Categoria | null = null
  categoria!: Categoria

  dialogCrearVisible = false
  tiposPuzzle: { id: number, nombre: string }[] = []

  constructor(
    private categoriaService: CategoriaService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.cargarCategorias();
    this.cargarTipos();
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

  cargarTipos() {
    this.categoriaService.getPuzzle()?.subscribe({
      next: (data: any[]) => {
        this.tiposPuzzle = data;
      },
      error: (err) => {
        console.error('Error al cargar tipos de puzzle:', err);
      }
    });
  }

  abrirCrearCategoria() {
    this.dialogCrearVisible = true;
  }

  cerrarCrearCategoria() {
    this.dialogCrearVisible = false;
  }

  guardarNuevaCategoria(payload: { nombre: string, idPuzzle: number }) {
    const body = {
      nombre: payload.nombre,
      idPuzzle: payload.idPuzzle
    };
    this.categoriaService.postCategoria(body).subscribe({
      next: () => {
        this.cargarCategorias();
        this.cerrarCrearCategoria();
      },
      error: (err) => {
        console.error('Error al crear categoria:', err);
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

  abrirEditarCategoria(categoria: Categoria) {
    this.categoriaAEditar = categoria
    this.dialogEditarVisible = true
  }
  //Tengo que poner aqui tambien añadirle los objetos para resolverlo y un boton de prueba
}
