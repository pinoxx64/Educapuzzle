import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  name: string = ''
  correo: string = ''
  contrasena: string = ''

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  onSubmit() {
    this.usuarioService.postUser({ name: this.name, correo: this.correo, contrasena: this.contrasena }).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error(error);
      }
    )
  }
}
