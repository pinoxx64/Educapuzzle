import { ObjetoService } from './../../../service/objeto.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../../interface/categoria';
import { CategoriaService } from '../../../service/categoria.service';
import { CaracteristicaService } from '../../../service/caracteristica.service';
import { EstadisticaService } from '../../../service/estadistica.service';

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

  tablaAciertos: boolean[] = [];

  cargando = false;
  error = '';
  resultado: any = null;

  constructor(
    private categoriaService: CategoriaService,
    private objetoService: ObjetoService,
    private caracteristicaService: CaracteristicaService,
    private estadisticasService: EstadisticaService
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
    this.tablaAciertos = [];
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
      }
    });

    this.objetoService.getObjetosPorCategoria(this.selectedCategoriaId).subscribe({
      next: (response: any) => {
        this.objetos = (response)
          ? response.objeto
          : [];
      }
    });

    this.categoriaService.sudoku(this.selectedCategoriaId).subscribe({
      next: (data: any) => {
        let arrays = data.body.Categoria;
        if (arrays) {
          this.caracC = arrays[0].map((v: any) => Number(v));
          this.caracF = arrays[1].map((v: any) => Number(v));
        }
        this.cargando = false;
      }
    });
  }

  opcionesObjetos() {
    return this.objetos.map(o => ({ id: o.id, nombre: o.nombre || (`Objeto ${o.id}`) }));
  }

  nombreCaracteristica(id: number): string {
    const carac = this.caracteristicas.find(c => c.id === id);
    return carac ? carac.nombre : `Categoria no introducida`;
  }

  getColorCelda(fila: number, col: number) {
    if (!this.tablaAciertos || this.tablaAciertos.length === 0) return '';

    const i = fila * 3 + col;

    if (this.tablaAciertos[i] === true) return 'acierto';
    if (this.tablaAciertos[i] === false) return 'error';
    return '';
  }

  finalizarSudoku() {
    this.error = '';
    this.resultado = null;
    this.tablaAciertos = [];

    let usuarioId: number | null = null;

    const userStr = sessionStorage.getItem('user');
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        if (userData?.user?.id) usuarioId = userData.user.id;
      } catch { }
    }

    if (!usuarioId) {
      this.error = 'Usuario no identificado';
      return;
    }

    this.cargando = true;

    this.categoriaService.resolverSudoku(usuarioId, this.caracC, this.caracF, this.tabla).subscribe({
      next: (res: any) => {
        this.resultado = res.body.Categoria;
        this.tablaAciertos = res.body.Categoria.tablaAciertos;
        this.cargando = false;
        this.estadisticasService.sumarSudokuJugados(usuarioId).subscribe();
        let falla = false;

        this.tablaAciertos.forEach(ta => {
          if (ta == false) {
            falla = true
            console.log("FALLA");
          }
        });

        if (falla == false) {
          this.estadisticasService.sumarSudokuGanados(usuarioId).subscribe();
        }
      },
      error: (err: any) => {
        this.error = err.error?.message || 'Error al verificar sudoku';
        this.cargando = false;
      }
    });


  }
}
