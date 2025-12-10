import { Component, OnInit } from '@angular/core';
import { EstadisticaService } from '../../service/estadistica.service';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-inicio',
  imports: [
    ChartModule
  ],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css']
})

export class InicioComponent implements OnInit {

  usuario: any = null;
  estadisticas: any = null;

  pieData: any;
  pieOptions: any;

  constructor(private estadisticasService: EstadisticaService) {}

  ngOnInit(): void {
    const usuarioActual = sessionStorage.getItem('user');
    this.usuario = usuarioActual ? JSON.parse(usuarioActual) : null;
    console.log('usuario', this.usuario);

    if (this.usuario?.user?.id) {
      this.estadisticasService.getEstadisticas(this.usuario.user.id).subscribe(
        (response) => {
          this.estadisticas = response;
          console.log('estadisticas', response);

          this.pieData = {
            labels: ['Sudokus Ganados', 'Sudokus Jugados'],
            datasets: [
              {
                data: [
                  this.estadisticas.estadisticas.sudokuGanados,
                  this.estadisticas.estadisticas.sudokuJugados
                ],
                backgroundColor: ['#42A5F5', '#66BB6A'],
              }
            ]
          };
          console.log('pieData', this.pieData);

          this.pieOptions = {
            responsive: true,
            plugins: {
              legend: {
                position: 'top'
              }
            }
          };
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
