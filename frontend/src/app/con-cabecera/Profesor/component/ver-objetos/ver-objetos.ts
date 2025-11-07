import { Objeto } from './../../../../interface/objeto';
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
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
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
    console.log('VerObjetos ngOnChanges', changes, 'visible=', this.visible, 'categoria=', this.categoria);
    if ((changes['categoria'] && this.categoria && this.categoria.id) || (changes['visible'] && this.visible)) {
      if (this.visible && this.categoria && this.categoria.id) {
        this.cargarObjetos();
      }
    }
  }

  handleHide(): void {
    console.log('handleHide called, emitting visibleChange=false and onClose');
    this.visible = false;
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

      let parsed: Objeto[] = [];
      
      if (Array.isArray(resp)) {
        parsed = resp as Objeto[];
      }else if (resp && Array.isArray(resp.objetos)) {
        parsed = resp.objetos;
      } else if (resp && Array.isArray(resp.data)) {
        parsed = resp.data;
      }else if (resp && resp.objeto && !Array.isArray(resp.objeto)) {
        parsed = [resp.objeto];
      }else if (resp && typeof resp === 'object') {
        const found = Object.values(resp).find(v => Array.isArray(v));
        if (found) parsed = found as Objeto[];
      }

      if (!parsed) parsed = [];

      console.log('Objetos parseados:', parsed);
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

  // guardarNuevaObjeto(nuevo: Partial<Objeto>) {
  //   if (!nuevo || !nuevo.nombre || !this.categoria) return;
  //   const payload: Partial<Objeto> = { nombre: nuevo.nombre.trim(), idCategoria: this.categoria.id };
  //   this.objetoService.postObjeto(payload).subscribe({
  //     next: () => { this.cargarObjetos(); this.cerrarCrearObj(); },
  //     error: err => console.error('Error creando objeto:', err)
  //   });
  // }

  abrirEditarObj(obj: Objeto) { this.objetoAEditar = { ...obj }; this.dialogEditarVisible = true; }
  cerrarEditarObj() { this.dialogEditarVisible = false; this.objetoAEditar = null; }

  guardarEdicionObjeto(objeto:any) {
    if (!objeto || !objeto.id) return;
    this.objetoService.putObjeto(objeto).subscribe({
      next: () => { this.cargarObjetos(); this.cerrarEditarObj(); },
      error: err => console.error('Error actualizando objeto:', err)
    });
  }

//   guardarNuevaObjeto(eventOrPayload: any) {
//   let nuevo: Partial<Objeto> | null = null;

//   if (eventOrPayload && typeof eventOrPayload === 'object' && ('nombre' in eventOrPayload || 'idCategoria' in eventOrPayload)) {
//     nuevo = eventOrPayload as Partial<Objeto>;
//   } else if (eventOrPayload && typeof eventOrPayload === 'object' && eventOrPayload.hasOwnProperty('detail')) {
//     nuevo = eventOrPayload.detail as Partial<Objeto>;
//   } else {
//     return;
//   }

//   if (!nuevo || !nuevo.nombre || !this.categoria) return;

//   const payload: Partial<Objeto> = {
//     nombre: nuevo.nombre.trim(),
//     idCategoria: this.categoria.id
//   };

//   this.objetoService.postObjeto(payload).subscribe({
//     next: () => { this.cargarObjetos(); this.cerrarCrearObj(); },
//     error: err => console.error(err)
//   });
// }

guardarNuevaObjeto(nuevo: Partial<Objeto>) {
  if (!nuevo || !nuevo.nombre) return;

  const idCat = nuevo.idCategoria ?? this.categoria?.id;
  if (!idCat) return;

  const payload: Partial<Objeto> = {
    nombre: nuevo.nombre.trim(),
    idCategoria: idCat
  };

  if ((nuevo as any).idCreador) {
    (payload as any).idCreador = (nuevo as any).idCreador;
  }

  this.objetoService.postObjeto(payload).subscribe({
    next: () => { this.cargarObjetos(); this.cerrarCrearObj(); },
    error: err => console.error(err)
  });
}


// guardarEdicionObjeto(eventOrPayload: any) {
//   if (!eventOrPayload) return;

//   if (eventOrPayload.objeto && eventOrPayload.caracteristicas && Array.isArray(eventOrPayload.caracteristicas)) {
//     const objetoActualizado: Objeto = eventOrPayload.objeto as Objeto;
//     const caracteristicasPayload = (eventOrPayload.caracteristicas as any[]).map(c => c.idCaracteristica);

//     if (!objetoActualizado || !objetoActualizado.id) return;

//     this.objetoService.putObjeto(objetoActualizado).subscribe({
//       next: () => {
//         if (typeof this.objetoService.replaceCaracteristicasDeObjeto === 'function') {
//           this.objetoService.replaceCaracteristicasDeObjeto(objetoActualizado.id, caracteristicasPayload).subscribe({
//             next: () => { this.cargarObjetos(); this.cerrarEditarObj(); },
//             error: () => { this.cargarObjetos(); this.cerrarEditarObj(); }
//           });
//         } else {
//           this.cargarObjetos();
//           this.cerrarEditarObj();
//         }
//       },
//       error: err => console.error(err)
//     });

//     return;
//   }

//   if (eventOrPayload.id && eventOrPayload.nombre) {
//     const objetoSolo = eventOrPayload as Objeto;
//     this.objetoService.putObjeto(objetoSolo).subscribe({
//       next: () => { this.cargarObjetos(); this.cerrarEditarObj(); },
//       error: err => console.error(err)
//     });
//     return;
//   }
// }


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
