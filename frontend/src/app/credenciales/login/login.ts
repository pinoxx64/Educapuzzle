import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../service/usuario.service';
import { FormsModule } from '@angular/forms';
import { UsuarioResponse } from '../../interface/usuario';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  correo: string = ''
  contrasena: string = ''
  
  constructor(
    private router: Router, 
    private usuarioService: UsuarioService
  ) {}

    onSubmit() {
    this.usuarioService.login({ correo: this.correo, contrasena: this.contrasena }).subscribe(
      (response: UsuarioResponse) => {
        console.log(response);
        sessionStorage.setItem('user', JSON.stringify(response));
        sessionStorage.setItem('token', response.token)
        this.router.navigate(['/inicio']);
      },
      (error) => {
        console.error(error);
      }
    )
  }
}
