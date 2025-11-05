import { Component } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
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
import { CrearCategoriaComponent } from '../component/crear-categoria/crear-categoria';
import { BehaviorSubject } from 'rxjs';



@Component({
  selector: 'app-getion-puzzle',
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    ConfirmPopupModule,
    EditarCategoriaComponent,
    CrearCategoriaComponent
  ],
  providers: [ConfirmationService],
  templateUrl: './getion-puzzle.html',
  styleUrl: './getion-puzzle.css'
})
export class GetionPuzzleComponent {
  categorias: Categoria[] = []
  dialogEditarVisible = false
  dialogObjVisible = false
  dialogCaracVisible = false
  categoriaAEditar: Categoria | null = null
  categoriaObj: Categoria | null = null
  categoriaCarac: Categoria | null = null
  categoria!: Categoria

  public dynamicMenuItems: BehaviorSubject<MenuItem[]> = new BehaviorSubject(
    [] as MenuItem[]
  )

  dialogCrearVisible = false
  tiposPuzzle: { id: number, nombre: string }[] = []

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

  abrirCrearCategoria() {
    this.dialogCrearVisible = true;
  }

  cerrarCrearCategoria() {
    this.dialogCrearVisible = false;
  }

  guardarNuevaCategoria(nombre: string) {
    const body = {
      nombre: nombre,
      idPuzzle: 1
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

  cerrarEditarCategoria() {
    this.dialogEditarVisible = false;
  }

  guardarEdicionCategoria() { }

  abrirVerObj(categoria: Categoria) {
    this.categoriaObj = categoria
    this.dialogObjVisible = true
  }

  abrirVerCarac(categoria: Categoria) {
    this.categoriaCarac = categoria
    this.dialogCaracVisible = true
  }
}
