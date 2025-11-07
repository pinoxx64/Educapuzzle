import { Caracteristica } from './../../../../interface/caracteristica';
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CaracteristicaService } from '../../../../service/caracteristica.service';
import { Categoria } from '../../../../interface/categoria';
import { ConfirmationService } from 'primeng/api';
import { EditarCaracteristica } from '../editar-caracteristica/editar-caracteristica';
import { CrearCaracteristicaComponent } from '../crear-caracteristica/crear-caracteristica';

@Component({
  selector: 'app-ver-caracteristicas',
  imports: [
    CommonModule,
    TableModule,
    ConfirmPopupModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    CrearCaracteristicaComponent,
    EditarCaracteristica
],
  providers: [ConfirmationService],
  templateUrl: './ver-caracteristicas.html',
  styleUrl: './ver-caracteristicas.css'
})
export class VerCaracteristicasComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onClose = new EventEmitter<void>();
  @Input() categoria: Categoria | null = null;

  caracteristicas: Caracteristica[] = [];

  dialogEditarVisible = false;
  dialogCrearVisible = false;
  caracteristicaAEditar: Caracteristica | null = null;

  constructor(
    private CaracteristicaService: CaracteristicaService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    console.log('Vercaracteristicas ngOnChanges', changes, 'visible=', this.visible, 'categoria=', this.categoria);
    if ((changes['categoria'] && this.categoria && this.categoria.id) || (changes['visible'] && this.visible)) {
      if (this.visible && this.categoria && this.categoria.id) {
        this.cargarCaracteristicas();
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

  cargarCaracteristicas() {
    if (!this.categoria || !this.categoria.id) {
      console.log('cargarcaracteristicas: categoría inválida', this.categoria);
      this.caracteristicas = [];
      return;
    }

    console.log('cargarcaracteristicas: solicitando caracteristicas para categoria', this.categoria.id);

    this.CaracteristicaService.getCaracteristicasPorCategoria(this.categoria.id).subscribe({
      next: (resp) => {
        console.log('Respuesta cruda getcaracteristicasPorCategoria:', resp);
        let parsed: Caracteristica[] = [];
        console.log(resp.data)
        if (Array.isArray(resp)) {
          parsed = resp as Caracteristica[];
        } else if (resp && Array.isArray(resp.caracteristica)) {
          parsed = resp.caracteristica;
        } else if (resp && Array.isArray(resp.data)) {
          parsed = resp.data;
        } else if (resp && resp.objeto && !Array.isArray(resp.objeto)) {
          parsed = [resp.objeto];
        } else if (resp && typeof resp === 'object') {
          const found = Object.values(resp).find(v => Array.isArray(v));
          if (found) parsed = found as Caracteristica[];
        }

        if (!parsed) parsed = [];

        console.log('caracteristicas parseados:', parsed);
        this.caracteristicas = parsed || [];
      },
      error: (err) => {
        console.error('Error al traer caracteristicas:', err);
        this.caracteristicas = [];
      }
    });
  }


  abrirCrearCaracteristica() { this.dialogCrearVisible = true; }
  cerrarCrearCaracteristica() { this.dialogCrearVisible = false; }

  abrirEditarCaracteristica(carac: Caracteristica) { this.caracteristicaAEditar = { ...carac }; this.dialogEditarVisible = true; }
  cerrarEditarCaracteristica() { this.dialogEditarVisible = false; this.caracteristicaAEditar = null; }

  guardarEdicionCaracteristica(carac: any) {
    if (!carac || !carac.id) return;
    this.CaracteristicaService.putCaracteristica(carac).subscribe({
      next: () => { this.cargarCaracteristicas(); this.cerrarEditarCaracteristica(); },
      error: err => console.error('Error actualizando objeto:', err)
    });
  }

  guardarNuevaCaracteristica(nuevo: Partial<Caracteristica>) {
    if (!nuevo || !nuevo.nombre) return;

    const idCat = nuevo.idCategoria ?? this.categoria?.id;
    if (!idCat) return;

    const payload: Partial<Caracteristica> = {
      nombre: nuevo.nombre.trim(),
      idCategoria: idCat
    };

    if ((nuevo as any).idCreador) {
      (payload as any).idCreador = (nuevo as any).idCreador;
    }

    this.CaracteristicaService.postCaracteristica(payload).subscribe({
      next: () => { this.cargarCaracteristicas(); this.cerrarCrearCaracteristica(); },
      error: err => console.error(err)
    });
  }

  deleteCarac(event: MouseEvent, id: number) {
    const target = event.currentTarget as HTMLElement;
    this.confirmationService.confirm({
      target,
      message: '¿Seguro que quieres eliminar esta caracteristica?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.CaracteristicaService.deleteCaracteristica(id).subscribe({
          next: () => { this.cargarCaracteristicas(); },
          error: err => console.error('Error borrando caracteristica:', err)
        });
      }
    });
  }
}

