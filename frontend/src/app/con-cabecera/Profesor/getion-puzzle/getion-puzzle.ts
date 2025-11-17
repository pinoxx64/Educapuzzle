// import { Component } from '@angular/core';
// import { ConfirmationService, MenuItem } from 'primeng/api';
// import { Categoria } from '../../../interface/categoria';
// import { CategoriaService } from '../../../service/categoria.service';
// import { CommonModule } from '@angular/common';
// import { ButtonModule } from 'primeng/button';
// import { TableModule } from 'primeng/table';
// import { ConfirmPopupModule } from 'primeng/confirmpopup';
// import { DialogModule } from 'primeng/dialog';
// import { InputTextModule } from 'primeng/inputtext';
// import { FormsModule } from '@angular/forms';
// import { EditarCategoriaComponent } from '../component/editar-categoria/editar-categoria';
// import { CrearCategoriaComponent } from '../component/crear-categoria/crear-categoria';
// import { BehaviorSubject } from 'rxjs';
// import { VerObjetosComponent } from "../component/ver-objetos/ver-objetos";
// import { VerCaracteristicasComponent } from '../component/ver-caracteristicas/ver-caracteristicas';

// @Component({
//   selector: 'app-getion-puzzle',
//   imports: [
//     CommonModule,
//     ButtonModule,
//     TableModule,
//     ConfirmPopupModule,
//     DialogModule,
//     InputTextModule,
//     FormsModule,
//     EditarCategoriaComponent,
//     CrearCategoriaComponent,
//     VerObjetosComponent,
//     VerCaracteristicasComponent
// ],
//   providers: [ConfirmationService],
//   templateUrl: './getion-puzzle.html',
//   styleUrls: ['./getion-puzzle.css']
// })
// export class GetionPuzzleComponent {
//   categorias: Categoria[] = [];
//   dialogEditarVisible = false;
//   dialogObjVisible = false;
//   dialogCaracVisible = false;
//   dialogCrearVisible = false;

//   categoriaAEditar: Categoria | null = null
//   categoriaObj: Categoria | null = null;
//   categoriaCarac: Categoria | null = null;

//   nombre: string = '';

//   public dynamicMenuItems: BehaviorSubject<MenuItem[]> = new BehaviorSubject([] as MenuItem[]);

//   constructor(
//     private categoriaService: CategoriaService,
//     private confirmationService: ConfirmationService
//   ) { }

//   ngOnInit() {
//     this.cargarCategorias();
//   }

//   cargarCategorias() {
//     this.categoriaService.getCategorias().subscribe({
//       next: (data: Categoria[]) => {
//         this.categorias = data;
//         console.log(data);
//       },
//       error: (err) => {
//         console.error('Error al cargar los categorias:', err);
//       }
//     });
//   }

//   abrirCrearCategoria() {
//     this.dialogCrearVisible = true;
//   }

//   cerrarCrearCategoria() {
//     this.dialogCrearVisible = false;
//   }

//   guardarNuevaCategoria(nueva: Partial<Categoria>) {
//     if (!nueva || !nueva.nombre) return;

//     this.categoriaService.postCategoria(nueva).subscribe({
//       next: () => {
//         this.cargarCategorias();
//         this.cerrarCrearCategoria();
//       },
//       error: (err) => {
//         console.error('Error al crear categoria:', err);
//       }
//     });
//   }

//   deleteCategorias(event: Event, id: number) {
//     this.confirmationService.confirm({
//       target: event.target as HTMLElement,
//       message: '¿Seguro que quieres eliminar esta categoria?',
//       icon: 'pi pi-exclamation-triangle',
//       acceptLabel: 'Sí',
//       rejectLabel: 'No',
//       accept: () => {
//         this.categoriaService.deleteCategoria(id).subscribe(() => {
//           this.cargarCategorias();
//         });
//       }
//     });
//   }

//   abrirEditarCategoria(categoria: Categoria) {
//     this.categoriaAEditar = categoria;
//     this.dialogEditarVisible = true;
//   }

//   cerrarEditarCategoria() {
//     this.dialogEditarVisible = false;
//     this.categoriaAEditar = null;
//   }

//   guardarEdicionCategoria(data: Partial<Categoria>) {
//     if (!this.categoriaAEditar || typeof this.categoriaAEditar.id !== 'number') {
//       console.error('No user selected for editing or user id is missing.');
//       return;
//     }
//     const categoriaEditado: Categoria = {
//       ...this.categoriaAEditar,
//       ...data,
//       id: this.categoriaAEditar.id
//     };
//     console.log(categoriaEditado)
//     this.categoriaService.putCategoria(categoriaEditado).subscribe(() => {
//       this.cargarCategorias()
//       this.cerrarEditarCategoria()
//     })
//   }

//   abrirVerObj(categoria: Categoria) {
//     this.categoriaObj = categoria;
//     this.dialogObjVisible = true;
//   }
//   cerrarVerObj() {
//     this.dialogObjVisible = false;
//     this.categoriaObj = null;
//   }

//   abrirVerCarac(categoria: Categoria) {
//     this.categoriaCarac = categoria;
//     this.dialogCaracVisible = true;
//   }
//   cerrarVerCarac() {
//     this.dialogCaracVisible = false;
//     this.categoriaCarac = null;
//   }

// }
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
import { VerObjetosComponent } from "../component/ver-objetos/ver-objetos";
import { VerCaracteristicasComponent } from '../component/ver-caracteristicas/ver-caracteristicas';
import { TestPuzzle } from '../component/test-puzzle/test-puzzle';

@Component({
  selector: 'app-getion-puzzle',
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    ConfirmPopupModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    EditarCategoriaComponent,
    CrearCategoriaComponent,
    VerObjetosComponent,
    VerCaracteristicasComponent,
    TestPuzzle
],
  providers: [ConfirmationService],
  templateUrl: './getion-puzzle.html',
  styleUrls: ['./getion-puzzle.css']
})
export class GetionPuzzleComponent {
  categorias: Categoria[] = [];
  dialogEditarVisible = false;
  dialogObjVisible = false;
  dialogCaracVisible = false;
  dialogCrearVisible = false;
  dialogTestVisible = false;

  categoriaAEditar: Categoria | null = null
  categoriaObj: Categoria | null = null;
  categoriaCarac: Categoria | null = null;
  categoriaTest: Categoria | null = null;

  nombre: string = '';

  public dynamicMenuItems: BehaviorSubject<MenuItem[]> = new BehaviorSubject([] as MenuItem[]);

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
        console.log(data);
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

  guardarNuevaCategoria(nueva: Partial<Categoria>) {
    if (!nueva || !nueva.nombre) return;

    this.categoriaService.postCategoria(nueva).subscribe({
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
    this.categoriaAEditar = categoria;
    this.dialogEditarVisible = true;
  }

  cerrarEditarCategoria() {
    this.dialogEditarVisible = false;
    this.categoriaAEditar = null;
  }

  guardarEdicionCategoria(data: Partial<Categoria>) {
    if (!this.categoriaAEditar || typeof this.categoriaAEditar.id !== 'number') {
      console.error('No user selected for editing or user id is missing.');
      return;
    }
    const categoriaEditado: Categoria = {
      ...this.categoriaAEditar,
      ...data,
      id: this.categoriaAEditar.id
    };
    console.log(categoriaEditado)
    this.categoriaService.putCategoria(categoriaEditado).subscribe(() => {
      this.cargarCategorias()
      this.cerrarEditarCategoria()
    })
  }

  abrirVerObj(categoria: Categoria) {
    this.categoriaObj = categoria;
    this.dialogObjVisible = true;
  }
  cerrarVerObj() {
    this.dialogObjVisible = false;
    this.categoriaObj = null;
  }

  abrirVerCarac(categoria: Categoria) {
    this.categoriaCarac = categoria;
    this.dialogCaracVisible = true;
  }
  cerrarVerCarac() {
    this.dialogCaracVisible = false;
    this.categoriaCarac = null;
  }

  abrirTestPuzzle(categoria: Categoria) {
    this.categoriaTest = categoria;
    this.dialogTestVisible = true;
  }

  cerrarTestPuzzle() {
    this.dialogTestVisible = false;
    this.categoriaTest = null;
  }

}