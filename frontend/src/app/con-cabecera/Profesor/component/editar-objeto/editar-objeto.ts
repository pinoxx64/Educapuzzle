import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Objeto } from '../../../../interface/objeto';
import { Caracteristica } from '../../../../interface/caracteristica';
import { ObjetoCaracteristica } from '../../../../interface/objeto-caracteristica';
import { CaracteristicaService } from '../../../../service/caracteristica.service';
import { ObjetoCaracteristicaService } from '../../../../service/objeto-caracteristica.service';
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
  @Input() idCategoria: number | null = null;

  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<{ objeto: Objeto; caracteristicas: ObjetoCaracteristica[] }>();

  nombre: string = '';
  caracteristicasSeleccionadas: { idCaracteristica: number | null; uid: string }[] = [];
  allCaracteristicas: any[] = [];
  erMensaje: string | null = null;

  constructor(
    private caracteristicaService: CaracteristicaService,
    private objetoService: ObjetoService,
    private objetoCaracteristicaService: ObjetoCaracteristicaService
  ) {
    this.allCaracteristicas = [];
    this.resetCaracteristicas();
  }

  ngOnInit() {
    console.log('ngOnInit - idCategoria:', this.idCategoria);
    if (this.idCategoria) {
      this.cargarCatalogoCaracteristicas();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges - changes:', changes);

    if (changes['idCategoria'] && this.idCategoria) {
      console.log('Cambió idCategoria a:', this.idCategoria);
      this.cargarCatalogoCaracteristicas();
    }

    if (changes['objeto'] && this.objeto) {
      console.log('Cambió objeto a:', this.objeto);
      this.nombre = this.objeto.nombre || '';
      this.loadObjetoCaracteristicas();
    }

    if (changes['visible'] && !this.visible) {
      this.erMensaje = null;
    }
  }

  private cargarCatalogoCaracteristicas() {
    if (!this.idCategoria) {
      console.warn('No hay idCategoria para cargar características');
      this.allCaracteristicas = [];
      return;
    }

    console.log('Cargando características para categoría:', this.idCategoria);
    this.caracteristicaService.getCaracteristicasPorCategoria(this.idCategoria).subscribe({
      next: (response: any) => {
        console.log('Respuesta de características:', response);

        let caracteristicas: any[] = [];
        caracteristicas = response.caracteristica;
        console.log('Características extraídas:', caracteristicas);

        this.allCaracteristicas = caracteristicas || [];
        console.log('allCaracteristicas asignadas:', this.allCaracteristicas);
      },
      error: (err: any) => {
        console.error('Error cargando catálogo de características:', err);
        this.allCaracteristicas = [];
      }
    });
  }

  private loadObjetoCaracteristicas() {
    if (!this.objeto) {
      this.resetCaracteristicas();
      return;
    }

    this.objetoService.getCaracteristicasPorObjeto(this.objeto.id).subscribe({
      next: (resp: any) => {
        let lista: any[] = [];
          lista = resp.objeto;
        if (lista.length > 0) {
          this.caracteristicasSeleccionadas = lista.map(item => ({
            idCaracteristica: item.id ?? null,
            uid: this.newUid()
          }));
        } else {
          this.resetCaracteristicas();
        }

        while (this.caracteristicasSeleccionadas.length < 2) {
          this.caracteristicasSeleccionadas.push({ idCaracteristica: null, uid: this.newUid() });
        }
      },
      error: (err: any) => {
        console.error('Error cargando características del objeto:', err);
        this.resetCaracteristicas();
      }
    });
  }

  private resetCaracteristicas() {
    this.caracteristicasSeleccionadas = [
      { idCaracteristica: null, uid: this.newUid() },
      { idCaracteristica: null, uid: this.newUid() }
    ];
  }

  private newUid(): string {
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

    const ids = this.caracteristicasSeleccionadas
      .map(c => c.idCaracteristica)
      .filter(x => x !== null && x !== undefined) as number[];

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
      this.erMensaje = 'Debe seleccionar una característica en cada select.';
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

    this.objetoService.putObjeto(objetoActualizado).subscribe({
      next: () => {
        this.objetoCaracteristicaService.getPorObjeto(this.objeto!.id).subscribe({
          next: (relacionesPrevias: any) => {
            const deletes = relacionesPrevias.map((r: any) =>
              this.objetoCaracteristicaService.deleteRelacion(
                r.idObjeto ?? this.objeto!.id,
                r.idCaracteristica
              )
            );

            Promise.all(deletes.map((d: { toPromise: () => any; }) => d.toPromise()))
              .then(() => {
                const posts = caracteristicasPayload.map(c =>
                  this.objetoCaracteristicaService.postRelacion({
                    idObjetos: c.idObjeto,
                    idCaracteristica: c.idCaracteristica
                  }).toPromise()
                );
                return Promise.all(posts);
              })
              .then(() => {
                this.onSave.emit({ objeto: objetoActualizado, caracteristicas: caracteristicasPayload });
                this.onClose.emit();
              })
              .catch((err: any) => {
                console.error('Error al guardar características:', err);
                this.erMensaje = 'Error al guardar las características.';
              });
          }
        });
      },
      error: (err: any) => {
        console.error('Error actualizando objeto:', err);
        this.erMensaje = 'Error al guardar el objeto.';
      }
    });
  }

  cerrar() {
    this.onClose.emit();
  }

  trackByUid(index: number, item: { uid: string }) {
    return item.uid;
  }
}