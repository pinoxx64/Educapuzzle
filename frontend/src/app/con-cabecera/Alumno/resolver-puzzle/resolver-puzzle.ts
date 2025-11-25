import { ObjetoService } from './../../../service/objeto.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../../interface/categoria';
import { CategoriaService } from '../../../service/categoria.service';
import { CaracteristicaService } from '../../../service/caracteristica.service';

@Component({
  selector: 'app-resolver-puzzle',
  imports: [CommonModule, FormsModule],
  templateUrl: './resolver-puzzle.html',
  styleUrl: './resolver-puzzle.css'
})
export class ResolverPuzzle implements OnInit {
  categorias: Categoria[] = [];
  selectedCategoriaId: number | null = null;

  objetos: any[] = [];
  caracteristicas: any[] = [];
  caracC: number[] = [];
  caracF: number[] = [];
  tabla: number[] = Array(9).fill(0);

  cargando = false;
  error = '';
  resultado: any = null;

  constructor(
    private categoriaService: CategoriaService,
    private objetoService: ObjetoService,
    private caracteristicaService: CaracteristicaService
  ) { }

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoriaService.getCategorias().subscribe({
      next: (cats: Categoria[]) => {
        this.categorias = cats;
      },
      error: err => {
        console.error(err);
        this.error = 'No se pudieron cargar las categorías';
      }
    });
  }

  async onCategoriaChange() {
    this.caracC = [];
    this.caracF = [];
    this.tabla = Array(9).fill(0);
    this.objetos = [];
    this.caracteristicas = [];
    this.resultado = null;
    this.error = '';

    if (!this.selectedCategoriaId) return;

    this.cargando = true;

    this.caracteristicaService.getCaracteristicasPorCategoria(this.selectedCategoriaId).subscribe({
      next: (response: any) => {
        this.caracteristicas = (response)
          ? response.caracteristica
          : [];
        console.log('Características cargadas:', this.caracteristicas);
      },
      error: (err) => {
        console.error('Error al cargar características:', err);
        this.caracteristicas = [];
      }
    });

    this.objetoService.getObjetosPorCategoria(this.selectedCategoriaId).subscribe({
      next: (response: any) => {
        this.objetos = (response)
          ? response.objeto
          : [];
        console.log('Objetos obtenidos del servicio ObjetoService:', this.objetos);
      },
      error: (err) => {
        console.error('Error al cargar objetos:', err);
        this.error = 'Error al cargar objetos de la categoría';
        this.cargando = false;
      }
    });

    this.categoriaService.sudoku(this.selectedCategoriaId).subscribe({
      next: (data: any) => {
        console.log('Respuesta crearSudoku:', data);

        let arrays: any = null;

          arrays = data.body.Categoria;
          console.log('Extraído desde data.body.Categoria:', arrays);


        if (arrays) {
          this.caracC = arrays[0].map((v: any) => Number(v));
          this.caracF = arrays[1].map((v: any) => Number(v));
        } else {
          this.caracC = [];
          this.caracF = [];
        }

        console.log('caracC asignadas:', this.caracC);
        console.log('caracF asignadas:', this.caracF);
        console.log('tabla (vacía para llenar):', this.tabla);

        this.cargando = false;
      },
      error: (err: any) => {
        console.error('Error al generar sudoku:', err);
        this.error = 'Error al generar sudoku';
        this.cargando = false;
      }
    });
  }

  opcionesObjetos() {
    return this.objetos.map(o => ({ id: o.id, nombre: o.nombre || (`Objeto ${o.id}`) }));
  }

  nombreCaracteristica(id: number): string {
    const carac = this.caracteristicas.find(c => c.id === id);
    return carac ? carac.nombre : `Característica ${id}`;
  }

  finalizarSudoku() {
    this.error = '';
    this.resultado = null;

    if (!this.selectedCategoriaId) {
      this.error = 'Selecciona una categoría primero';
      return;
    }

    if (!this.caracC.length || !this.caracF.length) {
      this.error = 'Sudoku incompleto: faltan características';
      return;
    }

    let usuarioId: number | null = null;

    const userStr = sessionStorage.getItem('user');
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        if (userData && userData.user && userData.user.id) {
          usuarioId = userData.user.id;
        }
      } catch (e) {
        console.error('Error al parsear usuario:', e);
      }
    }

    if (!usuarioId) {
      this.error = 'Usuario no identificado (no se pudo obtener usuarioId)';
      return;
    }

    console.log('Usuario ID:', usuarioId);

    this.cargando = true;

    this.categoriaService.resolverSudoku(usuarioId, this.caracC, this.caracF, this.tabla).subscribe({
      next: (res: any) => {
        console.log('res', res.body.Categoria)
        this.resultado = res.body.Categoria;
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('Error al verificar sudoku:', err);
        this.error = err.error?.message || 'Error al verificar sudoku';
        this.cargando = false;
      }
    });
  }

  nombreObjetoPorId(id: number) {
    const o = this.objetos.find(x => x.id === id);
    return o ? (o.nombre || `Objeto ${o.id}`) : '';
  }
}