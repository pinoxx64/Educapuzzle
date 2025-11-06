// import { ObjetoCaracteristicaService } from './../../../../service/objeto-caracteristica.service';
// import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
// import { TableModule } from 'primeng/table';
// import { ConfirmPopupModule } from 'primeng/confirmpopup';
// import { ButtonModule } from 'primeng/button';
// import { DialogModule } from 'primeng/dialog';
// import { InputTextModule } from 'primeng/inputtext';
// import { FormsModule } from '@angular/forms';
// import { EditarObjetoComponent } from '../editar-objeto/editar-objeto';
// import { CrearObjetoComponent } from '../crear-objeto/crear-objeto';
// import { ConfirmationService } from 'primeng/api';
// import { ObjetoService } from '../../../../service/objeto.service'; // ajusta ruta si hace falta
// import { Categoria } from '../../../../interface/categoria';
// import { Objeto } from '../../../../interface/objeto'; // tu interfaz
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-ver-objetos',
//   imports: [
//     CommonModule,
//     TableModule,
//     ConfirmPopupModule,
//     ButtonModule,
//     DialogModule,
//     InputTextModule,
//     FormsModule,
//     /*EditarObjetoComponent,
//     CrearObjetoComponent*/
//   ],
//   providers: [ConfirmationService],
//   templateUrl: './ver-objetos.html',
//   styleUrls: ['./ver-objetos.css']
// })
// export class VerObjetosComponent implements OnChanges {
//   @Input() visible: boolean = false;

//   @Output() visibleChange = new EventEmitter<boolean>();

//   @Output() onClose = new EventEmitter<void>();

//   @Input() categoria: Categoria | null = null;

//   objetos: Objeto[] = [];

//   dialogEditarVisible = false;
//   dialogCrearVisible = false;
//   objetoAEditar: Objeto | null = null;

//   constructor(
//     private objetoService: ObjetoService,
//     private confirmationService: ConfirmationService
//   ) {}

//   ngOnChanges(changes: SimpleChanges) {
//     if (changes['categoria'] && this.categoria && this.categoria.id) {
//       this.cargarObjetos();
//     }
//   }

//   cargarObjetos() {
//     if (!this.categoria || !this.categoria.id) {
//       this.objetos = [];
//       return;
//     }

//    this.objetoService.getObjetosPorCategoria(this.categoria.id).subscribe({
//     next: (data: Objeto[]) => {
//       console.log('Respuesta getObjetosPorCategoria:', data);
//       this.objetos = data;
//     },
//     error: (err) => {
//       console.error('Error cargando objetos desde servicio:', err);
//       this.objetos = [];
//     }
//   });
//   }

//   abrirCrearObj() {
//     this.dialogCrearVisible = true;
//   }

//   cerrarCrearObj() {
//     this.dialogCrearVisible = false;
//   }

//   guardarNuevaObjeto(nuevo: Partial<Objeto>) {
//     if (!nuevo || !nuevo.nombre || !this.categoria) return;

//     const payload: Partial<Objeto> = {
//       nombre: nuevo.nombre.trim(),
//       idCategoria: this.categoria.id
//     };

//     this.objetoService.postObjeto(payload).subscribe({
//       next: () => {
//         this.cargarObjetos();
//         this.cerrarCrearObj();
//       },
//       error: err => {
//         console.error('Error creando objeto:', err);
//       }
//     });
//   }

//   abrirEditarObj(obj: Objeto) {
//     this.objetoAEditar = { ...obj };
//     this.dialogEditarVisible = true;
//   }

//   cerrarEditarObj() {
//     this.dialogEditarVisible = false;
//     this.objetoAEditar = null;
//   }

//   guardarEdicionObjeto(objeto: Objeto) {
//     if (!objeto || !objeto.id) return;

//     this.objetoService.putObjeto(objeto).subscribe({
//       next: () => {
//         this.cargarObjetos();
//         this.cerrarEditarObj();
//       },
//       error: err => {
//         console.error('Error actualizando objeto:', err);
//       }
//     });
//   }

//   deleteObj(event: MouseEvent, id: number) {
//     console.log('deleteObj called, id =', id);
//     const target = event.currentTarget as HTMLElement;

//     this.confirmationService.confirm({
//       target: target,
//       message: '¿Seguro que quieres eliminar este objeto?',
//       icon: 'pi pi-exclamation-triangle',
//       acceptLabel: 'Sí',
//       rejectLabel: 'No',
//       accept: () => {
//         this.objetoService.deleteObjeto(id).subscribe({
//           next: () => {
//             console.log('Objeto eliminado', id);
//             this.cargarObjetos();
//           },
//           error: err => console.error('Error borrando objeto:', err)
//         });
//       },
//       reject: () => {
//         console.log('Eliminación cancelada', id);
//       }
//     });
//   }
// }
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { EditarObjetoComponent } from '../editar-objeto/editar-objeto';
import { CrearObjetoComponent } from '../crear-objeto/crear-objeto';
import { ConfirmationService } from 'primeng/api';
import { ObjetoService } from '../../../../service/objeto.service';
import { Categoria } from '../../../../interface/categoria';
import { Objeto } from '../../../../interface/objeto';

@Component({
  selector: 'app-ver-objetos',
  imports: [
    CommonModule,
    TableModule,
    ConfirmPopupModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    EditarObjetoComponent,
    CrearObjetoComponent
  ],
  providers: [ConfirmationService],
  templateUrl: './ver-objetos.html',
  styleUrls: ['./ver-objetos.css']
})
export class VerObjetosComponent implements OnChanges {
  // Visible viene del padre
  @Input() visible: boolean = false;

  // Two-way opcional
  @Output() visibleChange = new EventEmitter<boolean>();

  // Evento para el padre
  @Output() onClose = new EventEmitter<void>();

  @Input() categoria: Categoria | null = null;

  objetos: Objeto[] = [];

  dialogEditarVisible = false;
  dialogCrearVisible = false;
  objetoAEditar: Objeto | null = null;

  constructor(
    private objetoService: ObjetoService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    // Debug: ver cambios
    console.log('VerObjetos ngOnChanges', changes, 'visible=', this.visible, 'categoria=', this.categoria);
    if ((changes['categoria'] && this.categoria && this.categoria.id) || (changes['visible'] && this.visible)) {
      if (this.visible && this.categoria && this.categoria.id) {
        this.cargarObjetos();
      }
    }
  }

  /**
   * handleHide se llama desde (onHide) del p-dialog.
   * - sincroniza la propiedad visible
   * - emite visibleChange para two-way
   * - emite onClose para que el padre reciba el evento
   */
  handleHide(): void {
    console.log('handleHide called, emitting visibleChange=false and onClose');
    this.visible = false;
    // proteger por si alguien sobrescribió accidentalmente visibleChange
    if (this.visibleChange && typeof this.visibleChange.emit === 'function') {
      this.visibleChange.emit(false);
    } else {
      console.warn('visibleChange no está definido o no tiene emit()');
    }

    if (this.onClose && typeof this.onClose.emit === 'function') {
      this.onClose.emit();
    } else {
      console.warn('onClose no está definido o no tiene emit()');
    }
  }

cargarObjetos() {
  if (!this.categoria || !this.categoria.id) {
    console.log('cargarObjetos: categoría inválida', this.categoria);
    this.objetos = [];
    return;
  }

  console.log('cargarObjetos: solicitando objetos para categoria', this.categoria.id);

  this.objetoService.getObjetosPorCategoria(this.categoria.id).subscribe({
    next: (resp) => {
      console.log('Respuesta cruda getObjetosPorCategoria:', resp);

      // Normalizamos la respuesta a Array<Objeto>
      let parsed: Objeto[] = [];

      // caso 1: ya es un array
      if (Array.isArray(resp)) {
        parsed = resp as Objeto[];
      }
      // caso 2: viene envuelto en { objetos: [...] } o { data: [...] }
      else if (resp && Array.isArray(resp.objetos)) {
        parsed = resp.objetos;
      } else if (resp && Array.isArray(resp.data)) {
        parsed = resp.data;
      }
      // caso 3: viene un único objeto { objeto: {...} }
      else if (resp && resp.objeto && !Array.isArray(resp.objeto)) {
        parsed = [resp.objeto];
      }
      // caso 4: busca el primer array dentro del objeto de respuesta
      else if (resp && typeof resp === 'object') {
        const found = Object.values(resp).find(v => Array.isArray(v));
        if (found) parsed = found as Objeto[];
      }

      // fallback final: si no encontramos nada, dejamos array vacío
      if (!parsed) parsed = [];

      console.log('Objetos parseados:', parsed);
      // asegurarnos de asignar siempre un array
      this.objetos = parsed || [];
    },
    error: (err) => {
      console.error('Error al traer objetos:', err);
      this.objetos = [];
    }
  });
}


  abrirCrearObj() { this.dialogCrearVisible = true; }
  cerrarCrearObj() { this.dialogCrearVisible = false; }

  guardarNuevaObjeto(nuevo: Partial<Objeto>) {
    if (!nuevo || !nuevo.nombre || !this.categoria) return;
    const payload: Partial<Objeto> = { nombre: nuevo.nombre.trim(), idCategoria: this.categoria.id };
    this.objetoService.postObjeto(payload).subscribe({
      next: () => { this.cargarObjetos(); this.cerrarCrearObj(); },
      error: err => console.error('Error creando objeto:', err)
    });
  }

  abrirEditarObj(obj: Objeto) { this.objetoAEditar = { ...obj }; this.dialogEditarVisible = true; }
  cerrarEditarObj() { this.dialogEditarVisible = false; this.objetoAEditar = null; }

  guardarEdicionObjeto(objeto: Objeto) {
    if (!objeto || !objeto.id) return;
    this.objetoService.putObjeto(objeto).subscribe({
      next: () => { this.cargarObjetos(); this.cerrarEditarObj(); },
      error: err => console.error('Error actualizando objeto:', err)
    });
  }

  deleteObj(event: MouseEvent, id: number) {
    const target = event.currentTarget as HTMLElement;
    this.confirmationService.confirm({
      target,
      message: '¿Seguro que quieres eliminar este objeto?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.objetoService.deleteObjeto(id).subscribe({
          next: () => { this.cargarObjetos(); },
          error: err => console.error('Error borrando objeto:', err)
        });
      }
    });
  }
}
