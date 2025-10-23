import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-editar-rol-usuario',
  standalone: true,
  imports: [
    DialogModule, 
    FormsModule, 
    CommonModule, 
    ButtonModule, 
    CheckboxModule
  ],
  templateUrl: './editar-rol-usuario.html',
  styleUrl: './editar-rol-usuario.css'
})
export class EditarRolUsuario implements OnChanges{
  @Input() visible: boolean = false;
  @Input() usuarioRoles: string[] = [];
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<string[]>();

  roles = [
    { nombre: 'Administrador' },
    { nombre: 'Alumno' },
    { nombre: 'Profesor' },
  ]

  rolesSeleccionados: string[] = []
  rolesChecked: { [key: string]: boolean } = {}

  ngOnChanges(){
    this.rolesChecked = {};
    for (const rol of this.roles) {
      this.rolesChecked[rol.nombre] = this.usuarioRoles.includes(rol.nombre);
    }
  }


  cambiarRol(rol: string, checked: boolean) {
    if (checked) {
      if (!this.rolesSeleccionados.includes(rol)) this.rolesSeleccionados.push(rol);
    } else {
      this.rolesSeleccionados = this.rolesSeleccionados.filter(r => r !== rol);
    }
  }

  guardar() {
    this.rolesSeleccionados = this.roles
      .filter(rol => this.rolesChecked[rol.nombre])
      .map(rol => rol.nombre);

    console.log(this.rolesSeleccionados.length);
    if (this.rolesSeleccionados.length === 0) {
      this.rolesSeleccionados = ['Alumno'];
      this.rolesChecked['Alumno'] = true;
    }

    this.onSave.emit(this.rolesSeleccionados);
  }

  cerrar() {
    this.onClose.emit();
  }
}
