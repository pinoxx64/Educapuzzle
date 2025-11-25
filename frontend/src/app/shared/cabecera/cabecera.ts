import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.html',
  styleUrls: ['./cabecera.css'],
  imports: [
    CommonModule,
    ButtonModule
  ]
})
export class CabeceraComponent implements OnInit {
  isAdmin: boolean = false;
  isAlumno: boolean = false
  isProfesor: boolean = false

  constructor(private router: Router) {}

  ngOnInit() {
    const user = sessionStorage.getItem('user');
    if (user) {
      const usuario = JSON.parse(user);
      this.isAdmin = usuario.user.roles.includes('Administrador');
      this.isAlumno = usuario.user.roles.includes('Alumno')
      this.isProfesor = usuario.user.roles.includes('Profesor');
    }
  }

  inicio() {
    this.router.navigate(['/inicio']);
  }

  gestionUser() {
    this.router.navigate(['/gestionUser']);
  }

  gestionPuzzle() {    
    this.router.navigate(['/gestionPuzzle']);
  }

  verPuzzle() {
    this.router.navigate(['/verPuzzle']);
  }

  resolverPuzzle() {
    this.router.navigate(['/resolverPuzzle']);
  }

  ranking() {
    this.router.navigate(['/ranking']);
  }

  foro() {
    this.router.navigate(['/foro']);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}