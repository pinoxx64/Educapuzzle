import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Categoria } from '../../../../interface/categoria';
import { Objeto } from '../../../../interface/objeto';
import { Caracteristica } from '../../../../interface/caracteristica';
import { ObjetoCaracteristica } from '../../../../interface/objeto-caracteristica';
import { CaracteristicaService } from '../../../../service/caracteristica.service';
import { ObjetoService } from '../../../../service/objeto.service';

@Component({
  selector: 'app-editar-objeto',
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    SelectModule
  ],
  templateUrl: './editar-objeto.html',
  styleUrls: ['./editar-objeto.css']
})
export class EditarObjetoComponent implements OnInit, OnChanges {
  @Input() visible: boolean = false;
  @Input() objeto: Objeto | null = null;

  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<{ objeto: Objeto; caracteristicas: ObjetoCaracteristica[] }>();

  nombre: string = '';

  caracteristicasSeleccionadas: { idCaracteristica: number | null; uid: string }[] = [];

  allCaracteristicas: Caracteristica[] = [];

  erMensaje: string | null = null;

  constructor(
    private caracteristicaService: CaracteristicaService,
    private objetoService: ObjetoService
  ) {}

  ngOnInit() {
    this.cargarCatalogoCaracteristicas();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['objeto'] && this.objeto) {
      this.nombre = this.objeto.nombre;
      this.loadObjetoCaracteristicas();
    }

    if (changes['visible'] && !this.visible) {
      this.erMensaje = null;
    }
  }

  private cargarCatalogoCaracteristicas() {
    this.caracteristicaService.getCaracteristicas().subscribe({
      next: list => (this.allCaracteristicas = list || []),
      error: err => {
        console.error('Error cargando catálogo de características', err);
        this.allCaracteristicas = [];
      }
    });
  }

  private loadObjetoCaracteristicas() {
    if (!this.objeto) {
      this.resetCaracteristicas();
      return;
    }

    if (typeof this.objetoService.getCaracteristicasPorObjeto === 'function') {
      this.objetoService.getCaracteristicasPorObjeto(this.objeto.id).subscribe({
        next: lista => {
          if (Array.isArray(lista) && lista.length > 0) {
            this.caracteristicasSeleccionadas = lista.map((item: ObjetoCaracteristica) => ({
              idCaracteristica: item.idCaracteristica ?? null,
              uid: this.newUid()
            }));
            while (this.caracteristicasSeleccionadas.length < 2) {
              this.caracteristicasSeleccionadas.push({ idCaracteristica: null, uid: this.newUid() });
            }
          } else {
            this.resetCaracteristicas();
          }
        },
        error: err => {
          console.error('No se pudieron cargar relaciones objeto-característica:', err);
          this.resetCaracteristicas();
        }
      });
    } else {
      this.resetCaracteristicas();
    }
  }

  private resetCaracteristicas() {
    this.caracteristicasSeleccionadas = [
      { idCaracteristica: null, uid: this.newUid() },
      { idCaracteristica: null, uid: this.newUid() }
    ];
  }

  private newUid() {
    return Math.random().toString(36).slice(2, 9);
  }

  agregarCaracteristica() {
    this.caracteristicasSeleccionadas.push({ idCaracteristica: null, uid: this.newUid() });
  }

  puedeBorrar(index: number): boolean {
    return index > 1;
  }

  borrarCaracteristica(index: number) {
    if (!this.puedeBorrar(index)) return;
    this.caracteristicasSeleccionadas.splice(index, 1);
  }

  validarAntesDeGuardar(): boolean {
    this.erMensaje = null;

    if (!this.nombre || this.nombre.trim() === '') {
      this.erMensaje = 'El nombre del objeto es obligatorio.';
      return false;
    }

    const ids = this.caracteristicasSeleccionadas.map(c => c.idCaracteristica).filter(x => x !== null && x !== undefined) as number[];

    if (ids.length < 2) {
      this.erMensaje = 'Debe seleccionar al menos 2 características.';
      return false;
    }

    const duplicates = ids.filter((v, i, a) => a.indexOf(v) !== i);
    if (duplicates.length > 0) {
      this.erMensaje = 'No pueden repetirse características.';
      return false;
    }
    
    if (this.caracteristicasSeleccionadas.some(c => c.idCaracteristica === null || c.idCaracteristica === undefined)) {
      this.erMensaje = 'Debe seleccionar una característica en cada select o eliminar la fila.';
      return false;
    }

    return true;
  }

  save() {
    if (!this.validarAntesDeGuardar() || !this.objeto) return;

    const caracteristicasPayload: ObjetoCaracteristica[] = this.caracteristicasSeleccionadas.map(c => ({
      idObjeto: this.objeto!.id,
      idCaracteristica: c.idCaracteristica as number
    }));

    const objetoActualizado: Objeto = {
      ...this.objeto,
      nombre: this.nombre.trim()
    };

    this.onSave.emit({ objeto: objetoActualizado, caracteristicas: caracteristicasPayload });
    this.onClose.emit();
  }

  cerrar() {
    this.onClose.emit();
  }

  trackByUid(index: number, item: { uid: string }) {
    return item.uid;
  }
}
