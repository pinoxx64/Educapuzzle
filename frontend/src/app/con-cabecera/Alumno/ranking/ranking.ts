import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { UsuarioService } from '../../../service/usuario.service';

@Component({
  selector: 'app-ranking',
  imports: [CommonModule, TableModule, CardModule],
  templateUrl: './ranking.html',
  styleUrl: './ranking.css'
})
export class Ranking implements OnInit {
  usuarios: any[] = [];
  topThree: any[] = [];
  others: any[] = [];
  loading = false;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarRanking();
  }

  cargarRanking() {
    this.loading = true;
    this.usuarioService.getRanking().subscribe({
      next: (users: any[]) => {
        console.log('Ranking cargado', users);
        const sorted = (users || []).slice().sort((a: any, b: any) => {
          const sa = Number(a.puntuacion ?? a.puntos ?? 0);
          const sb = Number(b.puntuacion ?? b.puntos ?? 0);
          return sb - sa;
        });
        this.topThree = sorted.slice(0, 3);
        this.others = sorted.slice(3);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando ranking', err);
        this.loading = false;
      }
    });
  }

  obtenerNombre(u: any) {
    return u?.user?.name ?? u?.name ?? 'Usuario';
  }

  obtenerPuntos(u: any) {
    return Number(u?.puntuacion ?? u?.puntos ?? 0);
  }
}