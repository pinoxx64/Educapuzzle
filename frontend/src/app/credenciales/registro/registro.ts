import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstadisticaService } from '../../service/estadistica.service';

@Component({
  selector: 'app-registro',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class RegistroComponent {
  name: string = ''
  correo: string = ''
  contrasena: string = ''

  constructor(private router: Router, private usuarioService: UsuarioService, private estadisticaService: EstadisticaService) {}

  onSubmit() {
    this.usuarioService.postUser({ name: this.name, correo: this.correo, contrasena: this.contrasena }).subscribe(
      (response) => {
        console.log(response);
        this.estadisticaService.postEstadisticas({ usuId: response.user.id}).subscribe(
          (resEstadistica) => {
            console.log(resEstadistica);
            this.router.navigate(['/login']);
          },
          (errorEstadistica) => {
            console.error(errorEstadistica);
          }
        )
      },
      (error) => {
        console.error(error);
      }
    )
  }
}
