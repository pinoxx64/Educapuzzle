import { Component, OnInit } from '@angular/core';
import { EstadisticaService } from '../../service/estadistica.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css']
})
export class InicioComponent implements OnInit {
  usuario: any = null;
  estadisticas: any = null;

  constructor(private estadisticasService: EstadisticaService) {}

  ngOnInit(): void {
    const usuarioActual = sessionStorage.getItem('user');
    this.usuario = usuarioActual ? JSON.parse(usuarioActual) : null;
    console.log('usuario', this.usuario);

    if (this.usuario && this.usuario.user && this.usuario.user.id) {
      this.estadisticasService.getEstadisticas(this.usuario.user.id).subscribe(
        (response) => {
          this.estadisticas = response;
          console.log('estadisticas', response);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.warn('No hay usuario en sessionStorage o falta user.id');
    }
  }
}
